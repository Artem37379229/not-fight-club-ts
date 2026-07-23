import {createElement, createInput, createLabel} from "../../utils/createElement.ts";
import './Zone.scss'
const zones = ['head', 'neck', 'body', 'belly', 'legs']

interface IOptions {
    textTitle: string;
    prefix: string;
}

export class ZoneView {
    private arrZones: HTMLInputElement[] = []

    public render(root: HTMLElement, options: IOptions) {
        const {textTitle, prefix} = options

        const wrapper = createElement({
            name: 'form',
            classes: ['zones__wrapper'],
            root
        }) as HTMLFormElement;

        const title = createElement({
            name: 'h3',
            classes: ['zones__title'],
            text: textTitle,
            root: wrapper
        }) as HTMLTitleElement

        zones.forEach(zone => {
            const uniqueId = `${prefix}-${zone}`

            const input = createInput({
                name: 'input',
                type: 'checkbox',
                id: uniqueId,
                classes: ['zone__input', `${prefix}`],
                value: zone,
                root: wrapper
            }) as HTMLInputElement
            this.arrZones.push(input)

            const label = createLabel({
                name: 'label',
                classes: ['zone__label'],
                htmlFor: uniqueId,
                text: zone,
                root: wrapper
            }) as HTMLLabelElement
        })
    }

    public getInputZones (): HTMLInputElement[] {
        return this.arrZones
    }
}