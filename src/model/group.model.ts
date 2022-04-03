export default class Group {
    readonly id: number
    readonly name: string
    readonly desc: string
    readonly userId: number

    constructor(
        id: number = 0,
        name: string,
        desc: string,
        userId: number
    ) {
        this.id = id
        this.name = name
        this.userId = userId
        this.desc = desc
    }
}