import {ZoneController} from "./ZoneController.ts";
import {ZoneView} from "./ZoneView.ts";

export class ZoneListView {
    constructor(private zoneController: ZoneController, private zoneView: ZoneView) {}
    render (root: HTMLElement) {
        this.zoneController.init(root, {textTitle: "Attack Zones", prefix: 'attack'})
        this.zoneController.init(root, {textTitle: "Defence Zones", prefix: 'defence'})
    }
}