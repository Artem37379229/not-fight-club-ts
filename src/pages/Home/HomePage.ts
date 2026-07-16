import {HomeView} from "./HomeView.ts";
import {HomeController} from "./HomeController.ts";

export class HomePage {
    constructor(private root: HTMLElement) {
        const view = new HomeView()
        const controller = new HomeController(view)
        controller.init(root)
    }
}