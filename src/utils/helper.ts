import type {TEnemies} from "../data/enemies.ts";

function fisherYatesShuffle<T>(arr: T[]): T[] {
    const result = [...arr];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

const zones = ['neck', 'legs', 'body', 'head', 'belly']

function getRandomZones (count: number) {
    return [...zones].sort(() => Math.random() - 0.5).slice(0, count);
}

function setZones (obj: TEnemies) {
    const {attackCount, defenceCount} = obj
    const attackZones = getRandomZones(attackCount)
    const defenceZones = getRandomZones(defenceCount)

    return {
        attackZonesOpponent: attackZones,
        defenceZonesOpponent: defenceZones
    }
}

function calculateDamage (arrZones: string[], damage) {
    return arrZones.length * damage
}


export {fisherYatesShuffle, setZones, calculateDamage}