import { Router } from "express";

const router = Router()

router.get('/', (req, res, next) => {
    res.redirect('/home')
})

export default router