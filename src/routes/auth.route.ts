import { Router } from "express";
import jwt from 'jsonwebtoken'
import User, { Role } from "../model/user.model";
import userStorage from "../storage/user.storage";
import { JwtData } from "../security/jwt.data";
import config from "../configs/config";

const router = Router()

router.get('/login', (req, res) => {

    let error = req.session.error

    req.session.error = undefined

    res.render('login', { error })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    let user = userStorage.findUser(username)

    if (user && user.password === password) {
        
        let data: JwtData = { userId: user.id, role: user.role, username: username }
        console.log("data: " + username);
        req.session.token = jwt.sign(data, config.jwtSecret, { expiresIn: '1m' })

        res.redirect('/home')
    }
    else {
        req.session.error = "User or password wrong!"
        res.redirect('/auth/login')
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    let { username, password } = req.body
    let user = new User(0, username, password, "", "", 0, Role.User)

    userStorage.addUser(user)

    let data: JwtData = { userId: user.id, role: user.role, username: username }
    console.log("data: " + JSON.stringify(username));
    
    req.session.token = jwt.sign(data, config.jwtSecret, { expiresIn: '1m' })

    res.redirect('/home')
})

export default router