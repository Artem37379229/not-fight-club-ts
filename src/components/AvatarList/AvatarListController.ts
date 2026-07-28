import type {AvatarListView} from "./AvatarListView.ts";
import {characters} from "../../data/users.ts";
import type {ICharacter} from "../../data/types/types.ts";
import type {Store} from "../../core/Store.ts";
import type {ModalController} from "../Modal/ModalController.ts";

export class AvatarListController {
    constructor(private view: AvatarListView, private store: Store, private modalController: ModalController, private callback: () => void) {}

    public init (): HTMLElement {
        return this.view.render(characters) as HTMLElement
    }

    public bindEvents () {
        document.addEventListener('click', (e) => this.onClick(e))
    }

    private getPerson (id: number): ICharacter | undefined {
        const user = characters.find((item) => item.id === id)
        return user
    }

    private onClick (e: MouseEvent) {
        const target  = e.target as HTMLElement
        const id = Number(target.getAttribute('data-avatar-id'));

        if (!id) return;

        const person = this.getPerson(id)
        if (!person) return;

        const state = this.store.getState()
        this.store.setState({
            ...state,
            user: {
                ...state.user,
                ...person
            }
        })
        this.modalController.close()
        this.callback()
    }
}