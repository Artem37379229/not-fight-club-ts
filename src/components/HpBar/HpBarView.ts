import { createElement } from "../../utils/createElement.ts";

import './HpBar.scss'

export class HpBarView {
    private textElement!: HTMLSpanElement;
    private fillElement!: HTMLDivElement;

    render(root: HTMLElement, health: number, maxHealth: number) {

        const barElement = createElement({
            name: 'div',
            classes: ['hp-bar-container'],
            root
        });

        if (!barElement) return;

        this.fillElement = createElement({
            name: 'div',
            classes: ['hp-bar-fill'],
            root: barElement
        }) as HTMLDivElement;


        this.textElement = createElement({
            name: 'span',
            classes: ['hp-bar-text'],
            text: `${health} / ${maxHealth}`,
            root: barElement
        }) as HTMLSpanElement;

        this.updateWidth(health);
    }

    public getElements () {
        return {
            textEl: this.textElement,
            fillEl: this.fillElement,
        }
    }

    public setHp(health: number) {
        const currentHp = Math.max(0, health);


        if (this.textElement) {
            this.textElement.textContent = `${currentHp} / ${this.maxHealth}`;
        }

        this.updateWidth(currentHp);
    }

    private updateWidth(health: number) {
        if (this.fillElement && this.maxHealth > 0) {
            const percentage = (health / this.maxHealth) * 100;
            this.fillElement.style.width = `${percentage}%`;
        }
    }
}