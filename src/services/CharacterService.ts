import type {ICharacter} from "../data/types/types.ts";
import {characters} from "../data/users.ts";

export class CharacterService {
    public getOpponent (id: number): ICharacter | undefined {
        const opponent = characters.find((user) => user.id === id);
        return opponent;
    }
}