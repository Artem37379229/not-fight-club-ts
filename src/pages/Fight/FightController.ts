import type {FightView} from "./FightView.ts";
import type {Store} from "../../core/Store.ts";
import {calculateDamage, fisherYatesShuffle, setZones} from "../../utils/helper.ts";
import {enemies} from "../../data/enemies.ts";
import type {ZoneController} from "../../components/Zone/ZoneController.ts";
import type {ModalController} from "../../components/Modal/ModalController.ts";
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";
import type {LogsController} from "../../components/Logs/LogsController.ts";
import type {ILogsOptions} from "../../components/Logs/LogsView.ts";


export class FightController {
    constructor(private readonly view: FightView,
                private readonly store: Store,
                private readonly zoneController: ZoneController,
                private modal: ModalController,
                private bar: SnackbarController,
                private logsController: LogsController,
    ) {
    }

    private readonly root: HTMLElement

    private userHp: number;
    private opponentHp: number;
    private wins: number;
    private loses: number;

    public init(root: HTMLElement) {
        this.root = root;
        const state = this.store.getState();

        this.userHp = state.user.health;
        this.opponentHp = state.opponent.health;
        this.wins = state.user.wins;
        this.loses = state.user.loses;

        this.view.render(root, state.user, state.opponent)
        this.logsController.init(root)

        this.bindEvents()

        if (state.logsOptionsList != null) {
            state.logsOptionsList.forEach((log: ILogsOptions) => {
                this.logsController.render(log);
            });
        }
    }

    public updateStore() {
        const opponentArr = fisherYatesShuffle(enemies)[0]

        this.store.setState({
            ...this.store.getState(),
            opponent: opponentArr
        })
    }

    private logic() {
        const state = this.store.getState()
        const stateUser = state.user;
        const stateOpponent = state.opponent;

        const attackCountUser = stateUser.attackCount
        const defenceCountUser = stateUser.defenceCount

        const {attackedZones, defenceZones} = this.zoneController.getValueZones()
        const {attackZonesOpponent, defenceZonesOpponent} = setZones(stateOpponent)

        if (attackedZones.length > attackCountUser || defenceZones.length > defenceCountUser || attackedZones.length < attackCountUser || defenceZones.length < defenceCountUser) {
            this.bar.show(`Выберите ${attackCountUser} атакующую зону и ${defenceCountUser} защитных зоны`)
            return;
        }

        const userChance = Math.random() < 0.2
        const opponentChance = Math.random() < 0.2
        const criticalDamage = 1.5

        const defenceZoneUser = attackZonesOpponent.filter(zone => defenceZones.includes(zone));
        const defenceZoneOpponent = attackedZones.filter(zone => defenceZonesOpponent.includes(zone));

        let successZonesUser = attackedZones.filter(zone => !defenceZonesOpponent.includes(zone))
        let successZonesOpponent = attackZonesOpponent.filter(zone => !defenceZones.includes(zone))

        let criticalZoneUser = []
        let criticalZoneOpponent = []

        if (defenceZoneOpponent.length >= 1 && userChance) {
            console.log(1)
            successZonesUser = [...attackedZones.filter(zone => !defenceZonesOpponent.includes(zone))]
            criticalZoneUser = [defenceZoneOpponent[0]]
            defenceZoneOpponent.shift()
        }

        if (defenceZoneUser.length >= 1 && opponentChance) {
            console.log(1)
            successZonesOpponent = [...attackZonesOpponent.filter(zone => !defenceZones.includes(zone))]
            criticalZoneOpponent = [defenceZoneUser[0]]
            defenceZoneUser.shift()
        }

        const criticalDamageUser = criticalZoneUser.length * stateUser.damage * criticalDamage
        const criticalDamageOpponent = criticalZoneOpponent.length * stateOpponent.damage * criticalDamage

        const damageUser = userChance ? calculateDamage(successZonesUser, stateUser.damage) + criticalDamageUser  : calculateDamage(successZonesUser, stateUser.damage)
        const damageOpponent = opponentChance ? calculateDamage(successZonesOpponent, stateOpponent.damage) + criticalDamageOpponent : calculateDamage(successZonesOpponent, stateOpponent.damage)

        this.userHp -= damageOpponent
        this.opponentHp -= damageUser

        let isGameOver = false
        let winner = null

        const {userBar, opponentBar} = this.view.getBars()

        userBar?.setHp(this.userHp, stateUser.maxHealth)
        opponentBar?.setHp(this.opponentHp, stateOpponent.maxHealth)

        const logsOptions: ILogsOptions = {
            userName: stateUser.name,
            opponentName: stateOpponent.name,
            damageUser: stateUser.damage,
            damageOpponent: stateOpponent.damage,
            successUserAttackZones: successZonesUser,
            defenceUserZones: defenceZoneUser,
            defenceOpponentZones: defenceZoneOpponent,
            successOpponentAttackZones: successZonesOpponent,
            criticalZoneOpponent,
            criticalZoneUser,
            criticalDamageUser,
            criticalDamageOpponent,
        }

        const currentLogsList = state.logsOptionsList || [];
        const updatedLogsList = [...currentLogsList, logsOptions];

        this.logsController.render(logsOptions)

        this.store.setState({
            ...state,
            user: {...stateUser, health: this.userHp},
            opponent: {...stateOpponent, health: this.opponentHp},
            logsOptionsList: updatedLogsList
        })

        if (this.userHp <= 0 && this.opponentHp <= 0) {
            isGameOver = true
            winner = "Draw"
            return;
        } else if (this.userHp <= 0) {
            this.loses++;
            isGameOver = true
            winner = stateOpponent.name
        } else if (this.opponentHp <= 0) {
            this.wins++;
            isGameOver = true;
            winner = stateUser.name
        }

        if (isGameOver) {
            this.store.setState({
                ...state,
                user: {...stateUser, health: stateUser.maxHealth, wins: this.wins, loses: this.loses},
                opponent: null,
                logsOptionsList: null
            });

            this.modal.show(this.view.renderWinner(winner), () => {
                window.location.hash = "character"
            })
            return;
        }
    }


    private bindEvents() {
        const [button]: Element = this.view.getElements()
        button.addEventListener('click', () => this.logic())
    }
}