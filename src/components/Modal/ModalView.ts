import {createElement} from "../../utils/createElement.ts";

import './Modal.scss'

export class ModalView {
    private modal: HTMLDivElement;
    private modalContent: HTMLDivElement;

    public render(root: HTMLElement) {

        this.modal = createElement({
            name: 'div',
            classes: ['modal'],
            root
        }) as HTMLDivElement;

        this.modalContent = createElement({
            name: 'div',
            classes: ['modal__content'],
            root: this.modal
        }) as HTMLDivElement;
    }

    public show() {
        this.modal.classList.add('modal-active');
    }

    public hide () {
        this.modal.classList.remove('modal-active');
    }

    public setContent(content: HTMLElement) {
        this.modalContent.append(content);
    }

    public getModalElements () {
        return {
            modal: this.modal,
            modalContent: this.modalContent
        }
    }
}