export class Input {

    private input: HTMLInputElement;

    constructor(input: HTMLInputElement) {
        this.input = input;
    }

    public getValue () {
        return this.input.value.trim();
    }

    public setValue (value: string) {
        this.input.value = value;
    }

    public checkValue (clas: string): boolean {
        const isError = this.getValue() === ''

        this.input.classList.toggle(clas, isError);
        return !isError;
    }
}