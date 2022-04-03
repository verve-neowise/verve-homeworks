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

async function findUser(username: string): Promise<User> {
    let query = 'SELECT * FROM users WHERE username = ?'
    return await storage.get(query, [username])
}

async function allUsers() {
    let query = 'SELECT * FROM users WHERE role="USER"'
    return await storage.get(query)
}

export default {
    addUser,
    findUser
}