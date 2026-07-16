import type {HeaderView} from "./HeaderView.ts";

export class HeaderController {
    constructor(private view: HeaderView) {}

    public init(root: HTMLElement) {
        this.view.render(root)
    }
}