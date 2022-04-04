import User from "../model/user.model";
import storage from "./storage";
import bcrypt from 'bcryptjs'

async function addUser(user: User) {

    let query = 'INSERT INTO users (username, password, name, surname, group_id, role) values(?, ?, ?, ?, ?, ?)'
    let hashedPassword = bcrypt.hashSync(user.password, 10)

    await storage.run(query, [
        user.username,
        hashedPassword,
        user.name,
        user.surname,
        user.groupId,
        user.role
    ])
}

async function findUsersByGroup(groupId: string): Promise<User[]> {
    let query = 'SELECT * FROM users WHERE group_id = ?'
    let data = await storage.all(query, [groupId])
    return data.map(mapUser)
}

async function findUser(username: string): Promise<User> {
    let query = 'SELECT * FROM users WHERE username = ?'
    let data = await storage.get(query, [username])
    return mapUser(data)
}

async function allUsers() {
    let query = 'SELECT * FROM users WHERE role="USER"'
    let datas = await storage.all(query)
    return datas.map(mapUser)
}

function mapUser(data: any): User {
    return new User(
        data.id,
        data.username,
        data.password,
        data.name,
        data.surname,
        data.group_id,
        data.role
    )
}

export default {
    addUser,
    findUser,
    allUsers,
    findUsersByGroup
}