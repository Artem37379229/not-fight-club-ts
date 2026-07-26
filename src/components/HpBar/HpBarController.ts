import type {HpBarView} from "./HpBarView.ts";

export class HpBarController {
    constructor(private view: HpBarView) {
    }

    init (root: HTMLElement, health: number, maxHealth: number) {
        this.view.render(root, health, maxHealth);
    }

    public setHp(health: number, maxHealth: number) {
        this.view.setHp(health);
    }
}