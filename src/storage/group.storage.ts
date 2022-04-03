import Group from "../model/group.model";
import storage from './storage'

async function addGroup(group: Group) {
    let query = "insert into groups(name, desc, user_id) values(?, ?, ?)"
    await storage.run(query, [group.name, group.desc, group.userId])
}

async function findGroup(groupId: number): Promise<Group> {
    let query = "select * from groups where id = ?"
    return await storage.get(query, [groupId]) 
}

async function deleteGroup(groupId: number) {
    let query = "delete from groups where id = ?"
    await storage.run(query, [groupId])
}

async function userGroups(userId: number): Promise<Group[]> {
    let query = "select * from groups where user_id = ?"
    return await storage.all(query, [userId])
}

async function allGroups(): Promise<Group[]> {
    let query = "select * from groups"
    return storage.all(query)
}

export default {
    addGroup,
    findGroup,
    userGroups,
    allGroups
}