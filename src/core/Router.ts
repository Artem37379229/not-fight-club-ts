import ROUTES from "./Routes.ts";
import type {Store} from "./Store.ts";
import type {SnackbarController} from "../components/SnackBar/SnackbarController.ts";
import type {ModalController} from "../components/Modal/ModalController.ts";

export class Router {
    constructor(
        private root: HTMLElement,
        private store: Store,
        private modalController: ModalController,
        private barController: SnackbarController
    ) {}

    public init() {
        window.addEventListener('hashchange', () => this.handleLocation())
        this.handleLocation()
    }

    private handleLocation() {
        const path = window.location.hash.slice(1) || '/'

        if (!this.store.getState().isLogin && path !== 'registration') {
            this.replaceHash('#registration');
            return;
        }

        if (this.store.getState().isLogin && path === 'registration') {
            this.replaceHash('#');
            return;
        }

        const Page = ROUTES[path] || ROUTES['404']

        this.root.innerHTML = ''

        new Page(this.root, this.store, this.modalController, this.barController)
    }

    private replaceHash(hash: string) {
        window.location.hash = hash
    }
}