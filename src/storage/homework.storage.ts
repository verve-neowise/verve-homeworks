import Homework from "../model/homework.model";
import storage from "./storage";

async function addHomework(homework: Homework, groupId: string): Promise<string> {
    let query = 'insert into homeworks(group_id, name, desc, date) values(?, ?, ?, ?)'    
    await storage.run(query, [groupId, homework.name, homework.desc, homework.date])
    let data: any = await storage.get('select last_insert_rowid() as id from homeworks;')
    return data.id
}

async function findHomeworks(groupId: string): Promise<Homework[]> {
    let query = 'select * from homeworks where group_id = ?'
    let data = await storage.all(query, [groupId])
    return data.map(mapHomework)
}

async function findHomework(homeworkId: string): Promise<Homework> {
    let query = 'select * from homeworks where id = ?'
    let data = await storage.get(query, [homeworkId])
    return mapHomework(data)
}

function mapHomework(data: any): Homework {
    return new Homework(
        data.id,
        data.name,
        data.desc,
        data.date
    )
}

export default {
    addHomework,
    findHomeworks,
    findHomework
}