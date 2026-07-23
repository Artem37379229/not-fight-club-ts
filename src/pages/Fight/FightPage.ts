import type {Store} from "../../core/Store.ts";
import {FightView} from "./FightView.ts";
import {FightController} from "./FightController.ts";
import {ZoneView} from "../../components/Zone/ZoneView.ts";
import {ZoneController} from "../../components/Zone/ZoneController.ts";
import type {ModalController} from "../../components/Modal/ModalController.ts";
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";
import {LogsView} from "../../components/Logs/LogsView.ts";
import {LogsController} from "../../components/Logs/LogsController.ts";

export class FightPage {
    constructor(root: HTMLElement, private readonly store: Store, private readonly bar: SnackbarController, private readonly modalController: ModalController) {
        const zoneView = new ZoneView()
        const zoneController = new ZoneController(zoneView)
        const view = new FightView(zoneController, zoneView)
        const logsView = new LogsView()
        const logsController = new LogsController(logsView)
        const controller = new FightController(view, this.store, zoneController, modalController, bar, logsController)

        if (!this.store.getState().opponent) {
            controller.updateStore();
        }

        controller.init(root)
    }
}