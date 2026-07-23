import type {ZoneView} from "./ZoneView.ts";

export class ZoneController {
    constructor(private readonly view: ZoneView) {}

    init (root: HTMLElement, options) {
        this.view.render(root, options)
    }

    public getValueZones () {
        const arrZones = this.view.getInputZones().filter((input: HTMLInputElement) => input.checked);
        const attackedZones = arrZones.filter((input: HTMLInputElement) => input.classList.contains('attack')).map((input: HTMLInputElement) => input.value);
        const defenceZones =  arrZones.filter((input: HTMLInputElement) => input.classList.contains('defence')).map((input: HTMLInputElement) => input.value);

        return {
            attackedZones,
            defenceZones
        }
    }
}