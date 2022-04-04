export default class Homework {
    readonly id: string
    readonly name: string
    readonly desc: string
    readonly date: string

    constructor(
        id: string,
        name: string,
        desc: string,
        date: string
    ) {
        this.id = id
        this.name = name
        this.desc = desc
        this.date = date
    }
}