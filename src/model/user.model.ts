export enum Role {
    User = 'user',
    Admin = 'admin'
}

export default class User {

    readonly id: number
    readonly username: string
    readonly password: string
    readonly name: string
    readonly surname: string
    readonly groupId: number
    readonly role: Role

    constructor(
        id: number,
        username: string,
        password: string,
        name: string,
        surname: string,
        groupId: number,
        role: Role
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.name = name
        this.surname = surname
        this.groupId = groupId
        this.role = role
    }
}