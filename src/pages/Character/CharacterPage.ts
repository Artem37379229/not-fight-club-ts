import {CharacterView} from "./CharacterView.ts";
import type {Store} from "../../core/Store.ts";
import type {ModalController} from "../../components/Modal/ModalController.ts";
import {CharacterController} from "./CharacterController.ts";
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";

export class CharacterPage {
    constructor(root: HTMLElement, private store: Store, private bar: SnackbarController, private modalController: ModalController) {
        const view = new CharacterView()
        const controller = new CharacterController(view, this.modalController, this.store)
        controller.init(root)
    }
}