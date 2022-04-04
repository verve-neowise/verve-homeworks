import Group from "../model/group.model";
import storage from './storage'

async function addGroup(group: Group) {
    let query = "insert into groups(name, desc, user_id) values(?, ?, ?)"
    await storage.run(query, [group.name, group.desc, group.userId])
}

async function findGroup(groupId: string): Promise<(Group | undefined)> {
    let query = "select * from groups where id = ?"
    let data =  await storage.get(query, [groupId]) 
    return mapGroup(data)
}

async function deleteGroup(groupId: number) {
    let query = "delete from groups where id = ?"
    await storage.run(query, [groupId])
}

async function userGroups(userId: number): Promise<(Group | undefined)[]> {
    let query = "select * from groups where user_id = ?"
    let datas =  await storage.all(query, [userId])
    return datas.map(mapGroup)
}

async function allGroups(): Promise<(Group | undefined)[] > {
    let query = "select * from groups"
    let datas = await storage.all(query)
    return datas.map(mapGroup)
}

function mapGroup(data: any): Group | undefined {
    return data ? new Group(
        data.id,
        data.name,
        data.desc,
        data.user_id
    ) : undefined
}

export default {
    addGroup,
    findGroup,
    userGroups,
    allGroups
}