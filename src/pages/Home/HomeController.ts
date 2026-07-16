import type {HomeView} from "./HomeView.ts";

export class HomeController {
    constructor(private view: HomeView) {}

    public init(root: HTMLElement) {
        this.view.render(root)
    }
}