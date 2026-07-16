import type {SettingsView} from "./SettingsView.ts";
import type {Store} from "../../core/Store.ts";
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";

export class SettingsController {
    constructor(private view: SettingsView, private store: Store, private barController: SnackbarController) {}

    public init (root: HTMLElement) {
        this.view.render(root, this.getNameInput())
        this.bindEvents()
    }

    private getNameInput (): string {
        return this.store.getState()?.user?.name
    }

    private onClick () {
        const {subInput} = this.view.getElements()
        const value = subInput.getValue()

        const state = this.store.getState()
        const currentName = state?.user?.name

        if (value === currentName) {
            this.barController.show('Имя не изменилось')
            return;
        }

        if (!value) {
            this.barController.show('Поле с именем не заполнено')
            return;
        }

        this.store.setState({
            ...state,
            user: {
                ...state.user,
                name: value
            }
        })

        this.barController.show('Имя сохранено')
    }

    private bindEvents () {
        const {form} = this.view.getElements()
        form.addEventListener('submit', () => this.onClick())
    }
}