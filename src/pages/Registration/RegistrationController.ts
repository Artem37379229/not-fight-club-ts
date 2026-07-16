import type {RegistrationView} from "./RegistrationView.ts";
import type {Store} from "../../core/Store.ts";
import type {SnackbarController} from "../../components/SnackBar/SnackbarController.ts";

export class RegistrationController {
    constructor(private view: RegistrationView, private store: Store, private barController: SnackbarController) {
    }

    public init(root: HTMLElement) {
        this.view.render(root);
        this.bindEvents()
    }

    private submit(e: SubmitEvent) {
        e.preventDefault()
        const {subInput} = this.view.getElements()

        if (!subInput.checkValue('registration__input-error')) {
            return
        }

        const store = this.store.getState()

        this.store.setState({
            ...store,
            user: {
                ...store.user,
                name: subInput.getValue()
            },
            isLogin: true
        })

        this.barController.show('Вы успешно зарегистрировались')

        window.location.hash = '/'
    }

    private bindEvents() {
        const {form} = this.view.getElements()
        form.addEventListener('submit', (e: SubmitEvent) => this.submit(e))
    }
}