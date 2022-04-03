import { Router } from 'express'
import Group from '../model/group.model'
import groupStorage from '../storage/group.storage'

const router = Router()

router.get('/', async (req, res) => {
    console.log("groups: ", req.payload)

    let groups = await groupStorage.userGroups(req.payload.userId)

    res.render('groups', {
        layout: 'admin',
        title: 'Groups',
        username: req.payload.username,
        groups
    })
})

router.post('/', async (req, res) => {
    let { name, desc } = req.body

    let group = new Group(0, name, desc, req.payload.userId)

    await groupStorage.addGroup(group)
    
    console.log("redirect from /home: ", req.payload);
    res.redirect('/groups')
}) 

export default router