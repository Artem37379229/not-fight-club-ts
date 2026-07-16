interface IOptions {
    name: string,
    classes?: string[],
    text?: string,
    root?: HTMLElement | null
}


function createElement(options: IOptions): HTMLElement | null {
    const {name, classes, text, root} = options;
    if (!name) {
        return null;
    }

    const el = document.createElement(name);

    if (classes.length > 0) {
        el.classList.add(...classes);
    }

    if (text) {
        el.textContent = text;
    }

    if (root) {
        root.append(el);
    }

    return el;
}

function createAnchorElement(options: IOptions & Partial<HTMLAnchorElement>): HTMLAnchorElement | null {
    const el = createElement(options) as HTMLAnchorElement;
    const {href} = options;

    if (!el) {
        return null;
    }

    if (href) {
        el.setAttribute('href', href)
    }

    return el;
}

function createInput(options: IOptions & Partial<HTMLInputElement>): HTMLInputElement | null {
    const el = createElement(options) as HTMLInputElement;
    const {type, id, placeholder, value} = options;

    if (!el) {
        return null;
    }

    if (value) {
        el.value = value;
    }

    if (type) {
        el.setAttribute('type', type);
    }

    if (id) {
        el.setAttribute('id', id);
    }

    if (placeholder) {
        el.setAttribute('placeholder', placeholder);
    }

    return el;
}

function createForm(options: IOptions): HTMLFormElement | null {
    const form = createElement(options) as HTMLFormElement;

    if (!form) {
        return null;
    }

    return form
}

function createLabel(options: IOptions & Partial<HTMLLabelElement>): HTMLLabelElement | null {
    const label = createElement(options) as HTMLLabelElement;
    const {htmlFor} = options
    if (!label) {
        return null;
    }
    if (htmlFor) {
        label.setAttribute('for', htmlFor);
    }
    return label
}

export {createElement, createAnchorElement, createInput, createForm, createLabel};