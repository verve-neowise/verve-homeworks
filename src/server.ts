import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'

import config from './configs/config'

// Routers
import authRoute from './routes/auth.route'
import rootRoute from './routes/root.route'

import authMiddleware from './security/auth.middleware'

config.setup(path.join(__dirname, '../.env'))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './pages')

app.use(authMiddleware)

app.use('/', rootRoute)
app.use('/auth', authRoute)

const port = process.env.PORT || 3000 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})