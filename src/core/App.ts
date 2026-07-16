import {Router} from "./Router.ts";
import {Store} from "./Store.ts";
import {SnackBarView} from "../components/SnackBar/SnackBarView.ts";
import {SnackbarController} from "../components/SnackBar/SnackbarController.ts";
import {HeaderView} from "../components/Header/HeaderView.ts";
import {HeaderController} from "../components/Header/HeaderController.ts";
import {ModalView} from "../components/Modal/ModalView.ts";
import {ModalController} from "../components/Modal/ModalController.ts";

export class App {
    private router: Router;

    constructor(private root: HTMLElement) {
        const header = document.querySelector("header") as HTMLHeadElement
        const headerView = new HeaderView()
        const headerController = new HeaderController(headerView)
        headerController.init(header)

        const barView = new SnackBarView()
        const barController = new SnackbarController(barView)
        barController.init(document.body)

        const modalView = new ModalView(root)
        const modalController = new ModalController(modalView)
        modalController.init(document.body)

        const store = new Store('not-fight-club-ts');
        this.router = new Router(this.root, store, barController, modalController);
        this.router.init();
    }
}