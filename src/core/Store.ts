import {Storage} from "./Storage.ts";
import type {ICharacter} from "../data/types/types.ts";
import {characters} from "../data/users.ts";

interface IState {
    user: ICharacter & {name: string, wins: number, loses: number};
    opponent: object | null;
    isLogin: boolean;
}

export class Store {
    private storage: Storage
    private state

    constructor(private readonly key: string, initialState: IState = {
        user: {
            wins: 0,
            loses: 0,
            name: '',
            ...characters[0]
        },
        opponent: null,
        isLogin: false
    }) {
        this.storage = new Storage(this.key)

        this.state = this.storage.load() ?? initialState
    }

    public setState(state: Partial<IState>) {
        this.state = {
            ...this.state,
            ...state
        }

        this.storage.save(this.state)
    }

    public getState() {
        return this.state
    }
}
