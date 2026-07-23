import type {ModalView} from "./ModalView.ts";

export class ModalController {
    constructor(private view: ModalView) {
    }

    private callback?: () => void;

    public init(root: HTMLElement) {
        this.view.render(root)
        this.bindEvents()
    }

    public show(content: HTMLElement, callback?: () => void) {
        this.view.setContent(content);
        this.view.show();
        this.callback = callback
    }

    private bindEvents() {
        const {modal, modalContent} = this.view.getModalElements()
        modal.addEventListener('click', () => this.close())
        // modalContent.addEventListener('click', (e) => e.stopPropagation())
    }

    public close() {
        this.view.hide()
        if (this.callback) {
            this.callback();
            this.callback = undefined;
        }
    }
}