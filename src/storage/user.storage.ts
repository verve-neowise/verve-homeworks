import User from "../model/user.model";

const users: User[] = []

function addUser(user: User) {
    users.push(user)
}

function findUser(username: string) {
    return users.find(user => user.username === username)
}

export default {
    addUser,
    findUser
}