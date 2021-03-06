export default class Group {
    readonly id: string
    readonly name: string
    readonly desc: string
    readonly userId: number
    active: string = ''

    constructor(
        id: string = '0',
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