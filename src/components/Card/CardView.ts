import {createElement} from "../../utils/createElement.ts";
import './Card.scss'
import type {TEnemies} from "../../data/enemies.ts";
import {HpBarController} from "../HpBar/HpBarController.ts";
import {HpBarView} from "../HpBar/HpBarView.ts";

export class CardView {
    private readonly name: string;
    private readonly emoji: string;

    private hpBar: HpBarController | null = null;

    constructor(options: TEnemies) {
        this.name = options.name;
        this.emoji = options.emoji;
    }

    render (root: HTMLElement, classes: string[], health: number, maxHealth: number) {
        const cardElement = createElement({
            name: 'div',
            classes: ['character-card', ...classes],
            root
        }) as HTMLDivElement;

        const avatarElement = createElement({
            name: 'div',
            classes: ['character-card__avatar'],
            text: this.emoji,
            root: cardElement
        }) as HTMLDivElement;


        const nameElement = createElement({
            name: 'h3',
            classes: ['character-card__name'],
            text: this.name,
            root: cardElement
        }) as HTMLTitleElement

        const hpBarView = new HpBarView()

        this.hpBar = new HpBarController(hpBarView)
        this.hpBar.init(cardElement, health, maxHealth)
    }

    getHpBar (): HpBarController | null {
        return this.hpBar;
    }
}