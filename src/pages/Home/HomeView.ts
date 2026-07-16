import {createAnchorElement} from "../../utils/createElement.ts";

import './Home.scss'

export class HomeView {
    public render (root: HTMLElement) {
        const figthLink = createAnchorElement({
            name: 'a',
            href: '/#fight',
            classes: ['fight__link'],
            root,
            text: 'Fight'
        })
    }
}