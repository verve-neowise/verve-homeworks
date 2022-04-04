import { Router } from 'express'
import Group from '../model/group.model'
import Homework from '../model/homework.model'
import Task from '../model/task.model'
import User, { Role } from '../model/user.model'
import groupStorage from '../storage/group.storage'
import homeworkStorage from '../storage/homework.storage'
import taskStorage from '../storage/task.storage'
import userStorage from '../storage/user.storage'

const router = Router()

router.get('/', async (req, res) => {

    let groups = await groupStorage.userGroups(req.payload.userId)
    if (groups.length === 0) {
        res.render('no-content', {
            layout: 'dashboard',
            title: 'Groups',
            username: req.payload.username,
            groups: []
        })
    }
    else {
        res.redirect('/groups/' + groups[0]?.id)
    }
})

router.get('/:id', async (req, res) => {
    let groupId = req.params.id

    let groups = await groupStorage.userGroups(req.payload.userId)
    let group = await groupStorage.findGroup(groupId)
    let pupils = await userStorage.findUsersByGroup(groupId)
    let homeworks = await homeworkStorage.findHomeworks(groupId)

    groups.forEach(g => g!.id == groupId ? g!.active = 'active' : g!.active = '')

    res.render('group_overview', {
        layout: 'dashboard',
        title: group!.name,
        desc: group!.desc,
        id: groupId,
        username: req.payload.username,
        groups,
        pupils,
        homeworks
    })
})

router.post('/:id/user', async (req, res) => {
    let groupId = req.params.id

    let { username, password, name, surname } = req.body
    let user = new User(0, username, password, name, surname, +groupId, Role.User)
    userStorage.addUser(user)

    res.redirect('/groups/' + groupId)
})

router.post('/:id/homework', async (req, res) => {
    let groupId = req.params.id

    let { name, desc } = req.body
    let now = new Date()
    let date = now.getDate() + "." + now.getMonth() + "." + now.getFullYear(); 
    let homework = new Homework("0", name, desc, date)

    let pupils = await userStorage.findUsersByGroup(groupId)

    let id = await homeworkStorage.addHomework(homework, groupId)

    for (const user of pupils) {
        let task = new Task("0", user.id, id)
        await taskStorage.addTask(task)
    }

    res.redirect('/groups/' + groupId)
})

router.get('/:id/homework/:h_id', async (req, res) => {
    let groupId = req.params.id
    let homeworkId = req.params.h_id

    let homework = await homeworkStorage.findHomework(homeworkId)
    let groups = await groupStorage.userGroups(req.payload.userId)
    let group = await groupStorage.findGroup(groupId)
    let tasks = await taskStorage.findTasks(homeworkId)

    console.log(homework);
        
    res.render('homeworks', {
        layout: 'dashboard',
        title: homework.name,
        desc: group!.desc,
        id: groupId,
        username: req.payload.username,
        groups,
        homework,
        tasks
    })    
})

router.post('/', async (req, res) => {
    let { name, desc } = req.body

    let group = new Group('0', name, desc, req.payload.userId)

    await groupStorage.addGroup(group)
    
    res.redirect('/groups')
}) 

export default router