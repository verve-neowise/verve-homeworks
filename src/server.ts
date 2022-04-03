import path from 'path'
import config from './configs/config'

import express from 'express'
import { engine } from 'express-handlebars'

import session from 'express-session'
import cookieParser from 'cookie-parser'

config.setup(path.join(__dirname, '../.env'))

// Routers
import authRoute from './routes/auth.route'
import homeRoute from './routes/home.route'
import rootRoute from './routes/root.route'
import groupsRoute from './routes/groups.route'

import authMiddleware from './security/auth.middleware'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

app.use(cookieParser())
app.use(session({
    secret: config.sessionSecret,
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './pages')

app.use(authMiddleware)

app.use('/', rootRoute)
app.use('/home', homeRoute)
app.use('/auth', authRoute)
app.use('/groups', groupsRoute)

const port = process.env.PORT || 3000 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})