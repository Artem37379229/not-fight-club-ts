import type {HpBarView} from "./HpBarView.ts";

export class HpBarController {
    constructor(private view: HpBarView) {
    }

    init (root: HTMLElement, health: number, maxHealth: number) {
        this.view.render(root, health, maxHealth);
    }

    public setHp(health: number, maxHealth: number) {
        const {textEl} = this.view.getElements()
        const currentHp = Math.max(0, health);

        if (textEl) {
            textEl.textContent = `${currentHp} / ${maxHealth}`;
        }
        this.updateWidth(currentHp, maxHealth);
    }

    private updateWidth(health: number, maxHealth: number) {
        const {fillEl} = this.view.getElements()
        if (fillEl && maxHealth > 0) {
            const percentage = (health / maxHealth) * 100;
           fillEl.style.width = `${percentage}%`;
        }
    }
}