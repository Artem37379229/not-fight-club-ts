export class Storage {
    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    save (data) {
        localStorage.setItem(this.key, JSON.stringify(data))
    }

    remove () {
        localStorage.removeItem(this.key)
    }

    clear () {
        localStorage.clear()
    }

    load () {
        const data = localStorage.getItem(this.key)
        if (!data) {
            return
        }
        return JSON.parse(data)
    }
}