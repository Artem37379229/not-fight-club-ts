import {Input} from "../../utils/createInput.ts";
import {createElement, createForm, createInput, createLabel} from "../../utils/createElement.ts";

import "./Form.scss"

export class FormView {
    private form: HTMLFormElement;
    private subInput: Input;

    public render(root: HTMLElement, value = "", buttonText = "Отправить") {

        const container = createElement({
            name: "div",
            classes: ["form"],
            root,
        });

        this.form = createForm({
            name: "form",
            classes: ["form__body"],
            root: container,
        }) as HTMLFormElement;

        const wrapper = createElement({
            name: "div",
            classes: ["form__group"],
            root: this.form,
        });

        const input = createInput({
            name: "input",
            classes: ["form__input"],
            type: "text",
            id: "formInput",
            root: wrapper,
            placeholder: "Введите имя",
            value,
        }) as HTMLInputElement;

        this.subInput = new Input(input);

        const label = createLabel({
            name: "label",
            classes: ["form__label"],
            text: "Введите имя",
            htmlFor: "formInput",
            root: wrapper,
        });

        const button = createElement({
            name: "button",
            classes: ["form__button"],
            text: buttonText,
            root: this.form,
        });
    }

    public getElements ()  {
        return {
            form: this.form,
            subInput: this.subInput,
        }
    }
}