import type {SnackBarView} from "./SnackBarView.ts";

export class SnackbarController {
    constructor(private view: SnackBarView) {
    }

    private timeoutId: number

    init(root: HTMLElement) {
        this.view.render(root)
    }

    show(text: string) {
        this.view.setMessage(text)
        this.view.show()

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.view.hide();
        }, 2000);
    }
}