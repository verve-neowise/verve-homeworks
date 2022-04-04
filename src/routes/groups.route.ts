import { Router } from 'express'
import Group from '../model/group.model'
import User, { Role } from '../model/user.model'
import groupStorage from '../storage/group.storage'
import userStorage from '../storage/user.storage'

const router = Router()

router.get('/', async (req, res) => {
    let groups = await groupStorage.userGroups(req.payload.userId)

    res.render('groups', {
        layout: 'admin',
        title: 'Groups',
        username: req.payload.username,
        groups
    })
})

router.get('/:id', async (req, res) => {
    let groupId = req.params.id

    console.log('Params:', req.params);

    let group = await groupStorage.findGroup(groupId)
    let pupils = await userStorage.findUsersByGroup(groupId)
    let homeworks: any[] = []

    res.render('group_overview', {
        layout: 'admin',
        title: group!.name,
        id: groupId,
        username: req.payload.username,
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
    
})

router.post('/', async (req, res) => {
    let { name, desc } = req.body

    let group = new Group(0, name, desc, req.payload.userId)

    await groupStorage.addGroup(group)
    
    res.redirect('/groups')
}) 

export default router