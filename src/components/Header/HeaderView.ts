import {createAnchorElement, createElement} from "../../utils/createElement.ts";
import './Header.scss'

interface IPaths {
    path: string,
    title: string,
}

const paths: IPaths[] = [
    {path: '/', title: 'Home'},
    {path: 'character', title: 'Character'},
    {path: 'settings', title: 'Settings'},
];

export class HeaderView {
    render(root: HTMLElement) {
        const headerContent = createElement({name: 'div', classes: ['header__content'], root}) as HTMLDivElement;
        const nav = createElement({name: 'nav', classes: ['header__menu'], root: headerContent}) as HTMLOListElement
        const ul = createElement({name: 'ul', classes: ['header__list'], root: nav}) as HTMLUListElement

        paths.forEach(({path, title}) => {
            const li = createElement({name: 'li', classes: ['header__list-item'], root: ul}) as HTMLLIElement
            const link = createAnchorElement({
                name: 'a',
                classes: ['header__link'],
                text: title,
                root: li,
                href: `#${path}`
            }) as HTMLAnchorElement
        })
    }
}