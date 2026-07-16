import './Registration.scss'
import {FormView} from "../../components/Form/FormView.ts";

export class RegistrationView {
    private formView = new FormView()

    render (root: HTMLElement) {
        this.formView.render(root, '')
    }

    getElements() {
        return this.formView.getElements();
    }
}