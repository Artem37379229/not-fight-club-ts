import type {CardView} from "./CardView.ts";

export class CardController {
    constructor(private readonly view: CardView) {}

    init (root: HTMLElement, classes: string[]) {
        this.view.render(root, [...classes])
    }
}