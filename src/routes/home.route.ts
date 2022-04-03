import { Router } from 'express'
import userStorage from '../storage/user.storage'
import { Role } from '../model/user.model'

const router = Router()

router.get('/', async (req, res) => {
    let user = await userStorage.findUser(req.payload.username)
    
    if (req.payload.role == Role.Admin) {

        console.log("redirect from /home: ", req.payload);
        
        res.redirect('/groups')
    }
    else {
        res.render('home', { username: user.name })
    }
})

export default router