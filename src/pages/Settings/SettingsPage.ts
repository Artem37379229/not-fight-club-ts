import type {Store} from "../../core/Store.ts";
import {SettingsView} from "./SettingsView.ts";
import {SettingsController} from "./SettingsController.ts";

import './Settings.scss'
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";

export class SettingsPage {
    constructor(private root: HTMLElement, private store: Store, private barController: SnackbarController) {
        const view = new SettingsView()
        const controller = new SettingsController(view, store, this.barController)
        controller.init(root)
    }
}