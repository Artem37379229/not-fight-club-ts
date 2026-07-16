import {createElement} from "../../utils/createElement.ts";
import './SnackBar.scss'

export class SnackBarView {
    private snackBar: HTMLDivElement;

    render (root: HTMLElement) {
        this.snackBar = createElement({
            name: 'div',
            classes: ['snackbar'],
            root,
        }) as HTMLDivElement;
    }

    public show() {
        this.snackBar.classList.add('snackbar--visible');
    }

    public setMessage (text: string) {
        this.snackBar.textContent = text
    }

    public hide() {
        this.snackBar.classList.remove('snackbar--visible');
    }

    public getBar (): HTMLElement {
        return this.snackBar;
    }
}