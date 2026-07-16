import type {ICharacter} from "../../data/types/types.ts";
import {createElement} from "../../utils/createElement.ts";

export class AvatarListView {
    render(users: ICharacter[]) {

        const avatarList = createElement({
            name: 'div',
            classes: ['avatar__list'],
        })

        users.forEach(({emoji, id}) => {
            const emojiEl = createElement({
                name: 'div',
                classes: ['character__emoji'],
                text: emoji,
                root: avatarList,
            }) as HTMLElement;
            emojiEl.setAttribute('data-avatar-id', String(id))
        })
        return avatarList
    }
}