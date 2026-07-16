import {RegistrationView} from "./RegistrationView.ts";
import {RegistrationController} from "./RegistrationController.ts";
import type {Store} from "../../core/Store.ts";
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";

export class RegistrationPage {
    constructor(private root: HTMLElement, private store: Store, private barController: SnackbarController) {
        const view = new RegistrationView()
        const controller = new RegistrationController(view, this.store, this.barController)
        controller.init(root)
    }
}