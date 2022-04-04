import Task from "../model/task.model";
import storage from "./storage";


async function addTask(task: Task) {
    let query = 'insert into tasks(user_id, homework_id, result, state) values(?, ?, ?, ?);'
    await storage.run(query, [task.userId, task.homeworkId, task.result, task.state])
}

async function findTasks(homeworkId: string): Promise<Task[]> {
    let query = 'select tasks.id as id, tasks.user_id as user_id, tasks.homework_id as homework_id, ' + 
    'users.name as name, users.surname as surname, tasks.result as result, tasks.state as state ' +
    'from tasks inner join users on tasks.user_id = users.id where tasks.homework_id = ? '

    let datas = await storage.all(query, [homeworkId])

    return datas.map(mapTask)
}

function mapTask(data: any) {
    console.log(data);
    return new Task(
        data.id,
        data.user_id,
        data.homework_id,
        data.name,
        data.surname,
        data.result,
        data.state
    )
}

export default {
    addTask,
    findTasks
}