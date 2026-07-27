import {CardView} from "../../components/Card/CardView.ts";
import {ZoneListView} from "../../components/Zone/ZoneListView.ts";
import type {ICharacter} from "../../data/types/types.ts";
import type {TEnemies} from "../../data/enemies.ts";
import {ZoneController} from "../../components/Zone/ZoneController.ts";
import {ZoneView} from "../../components/Zone/ZoneView.ts";
import {createElement} from "../../utils/createElement.ts";
import type {HpBarController} from "../../components/HpBar/HpBarController.ts";

export class FightView {
    private userCard: CardView | null = null;
    private opponentCard: CardView | null = null;

    private hpBarUser: HpBarController | null = null;
    private hpBarOpponent: HpBarController | null = null;

    private arrElements: Element[] = [];

    constructor(private zoneController: ZoneController, private zoneView: ZoneView) {
    }

    render(root: HTMLElement, userOptions: ICharacter & {name: string}, opponentOptions: TEnemies) {
        const {health: userHealth, maxHealth: userMaxHealth} = userOptions;
        const {health: opponentHealth, maxHealth: opponentMaxHealth} = opponentOptions;

        this.userCard = new CardView(userOptions);
        this.userCard.render(root, ['card__user'], userHealth, userMaxHealth);

        new ZoneListView(this.zoneController, this.zoneView).render(root);

        this.opponentCard = new CardView(opponentOptions);
        this.opponentCard.render(root, ['card__opponent'], opponentHealth, opponentMaxHealth);

        const attackButton = createElement({
            name: 'button',
            classes: ['btn', 'btn--attack'],
            text: 'Attack',
            root
        }) as HTMLButtonElement;

        if (attackButton) {
            this.arrElements.push(attackButton);
        }


        this.hpBarUser = this.userCard.getHpBar()
        this.hpBarOpponent = this.opponentCard.getHpBar()
    }

    renderWinner(winner: string): HTMLElement | null {
        const modalContent = createElement({name: 'div', classes: ['modal-wrapper']});

        if (!modalContent) return null;

        createElement({
            name: 'h2',
            text: 'Бой завершен!',
            classes: ['winner'],
            root: modalContent
        });

        createElement({
            name: 'div',
            classes: ['winner-highlight'],
            text: `Победитель: ${winner}`,
            root: modalContent
        });


        return modalContent;
    }

    getElements() {
        return this.arrElements;
    }

    public getBars () {
        return {
            userBar: this.hpBarUser,
            opponentBar: this.hpBarOpponent
        }
    }
}