import type {ModalView} from "./ModalView.ts";

export class ModalController {
    constructor(private view: ModalView) {}

    public init (root: HTMLElement) {
        this.view.render(root)
        this.bindEvents()
    }

    public show (content: HTMLElement) {
        this.view.setContent(content);
        this.view.show();
    }

    private bindEvents () {
        const {modal, modalContent} = this.view.getModalElements()
        modal.addEventListener('click', () => this.view.hide())
        // modalContent.addEventListener('click', (e) => e.stopPropagation())
    }

    public close () {
        this.view.hide()
    }
}