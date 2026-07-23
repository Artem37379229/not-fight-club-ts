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

    public init(root: HTMLElement) {
        this.root = root;
        const state = this.store.getState();

        this.view.render(root, state.user, state.opponent)
        this.bindEvents()
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
        const {attackedZones, defenceZones} = this.zoneController.getValueZones()
        const {attackZonesOpponent, defenceZonesOpponent} = setZones(state.opponent)

        if (attackedZones.length > 1 || defenceZones.length > 2 || attackedZones.length < 1 || defenceZones.length < 1) {
            this.bar.show("Выберите 1 атакующую зону и 2 защитных зоны")
            return;
        }

        const successZonesUser = attackedZones.filter(zone => !defenceZonesOpponent.includes(zone));
        const damageUser = calculateDamage(successZonesUser, state.user.damage)

        const successZonesOpponent = attackZonesOpponent.filter(zone => !defenceZones.includes(zone));
        const damageOpponent = calculateDamage(successZonesOpponent, state.opponent.damage)

        const healthUser = state.user.health - damageOpponent
        const healthOpponent = state.opponent.health - damageUser

        let isGameOver = false
        let winner = null

        const user = {...state.user, health: healthUser}
        const opponent = {...state.opponent, health: healthOpponent}

        if (healthUser <= 0 && healthOpponent <= 0) {
            isGameOver = true
            winner = "Draw"
        } else if (healthUser <= 0) {
            isGameOver = true
            winner = state.opponent.name
            user.loses = state.user.loses + 1
        } else if (healthOpponent <= 0) {
            isGameOver = true;
            winner = state.user.name
            user.wins = state.user.wins + 1
        }

        const {userBar, opponentBar} = this.view.getBars()

        userBar?.setHp(healthUser, state.user.maxHealth)
        opponentBar?.setHp(healthOpponent, state.opponent.maxHealth)


        if (isGameOver) {
            this.modal.show(this.view.renderWinner(winner, healthOpponent, healthUser), () => {
                this.store.setState({
                    ...this.store.getState(),
                    user: {...user, health: state.user.maxHealth},
                    opponent: null
                });
                window.location.hash = "character"
            })

            user.health = state.user.maxHealth;
            opponent.health = state.opponent.maxHealth;
            return;
        }

        this.store.setState({
            ...state,
            user,
            opponent,
        })

        const logsOptions: ILogsOptions = {
            userName: state.user.name,
            opponentName: state.opponent.name,
            damageUser: state.user.damage,
            damageOpponent: state.opponent.damage,
            successUserAttackZones: successZonesUser,
            defenceUserZones: defenceZonesOpponent,
        }

        this.logsController.init(this.root, logsOptions)
    }

    private bindEvents() {
        const [button]: Element = this.view.getElements()
        button.addEventListener('click', () => this.logic())
    }
}