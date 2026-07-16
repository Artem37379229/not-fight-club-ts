import type {CharacterView} from "./CharacterView.ts";
import type {ModalController} from "../../components/Modal/ModalController.ts";
import type {Store} from "../../core/Store.ts";
import {AvatarListView} from "../../components/AvatarList/AvatarListView.ts";
import {AvatarListController} from "../../components/AvatarList/AvatarListController.ts";

export class CharacterController {
    constructor(private view: CharacterView, private modalController: ModalController, private store: Store) {}
    private root: HTMLElement

    init (root: HTMLElement) {
        this.rerender(root)
    }

    getValue () {
        const stateUser = this.store.getState()?.user;
        const emoji = stateUser?.emoji;
        const name = stateUser?.name

        return {emoji, name}
    }

    private rerender (root: HTMLElement) {
        this.root = root;
        root.innerHTML = "";
        const {emoji, name} = this.getValue()
        this.view.render(root, name, emoji)
        this.bindEvents()
    }

    bindEvents () {
        const {emoji} = this.view.getElements()
        emoji.addEventListener('click', () => this.onClick())
    }

    onClick () {
        const avatarView = new AvatarListView()
        const avatarController =  new AvatarListController(avatarView, this.store, this.modalController, () => this.rerender(this.root))
        this.modalController.show(avatarController.init())
        avatarController.bindEvents()
    }
}