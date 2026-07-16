import {createElement} from "../../utils/createElement.ts";
import {FormView} from "../../components/Form/FormView.ts";

export class SettingsView {
    private formView = new FormView()

    public render(root: HTMLElement, inputValue: string) {
        const settings = createElement({
            name: 'div',
            classes: ['settings'],
            root
        })
        const settingsContent = createElement({
            name: 'div',
            classes: ['settings__content'],
            root: settings
        }) as HTMLElement

        this.formView.render(settingsContent, inputValue)
    }

    public getElements () {
        return this.formView.getElements()
    }
}