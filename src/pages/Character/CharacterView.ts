import {createElement} from "../../utils/createElement.ts";

import "./Character.scss"

export class CharacterView {
    private emoji: HTMLElement
    public render (root: HTMLElement, name: string, emojiText: string) {
        const character = createElement({
            name: 'div',
            classes: ['character'],
            root
        })
        const characterContent = createElement({
            name: 'div',
            classes: ['character__content'],
            root: character
        })

        const title = createElement({
            name: 'h3',
            classes: ['character__title'],
            text: name,
            root: characterContent
        })
        this.emoji = createElement({
            name: 'div',
            classes: ['character__emoji'],
            text: emojiText,
            root: characterContent
        }) as HTMLElement
    }

    public getElements () {
        return {
            emoji: this.emoji
        }
    }
}