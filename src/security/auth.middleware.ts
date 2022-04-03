import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../configs/config";
import { JwtData } from "./jwt.data";
import { isOpen, isPermitted } from "./permission";


declare module "express-session" {
    interface SessionData {
        token: string,
        error: string
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    
    if (isOpen(req.url)) {
        return next()
    }
    const token = req.session.token
    // Not authorized
    if (!token) {
        return res.redirect('/auth')
    }

    let payload = verify(token)
    
    // No has token
    if (!payload) {
        return res.redirect('/auth')
    }

    if (isPermitted(req.url, payload.role)) {
        req.payload = payload
        return next()
    }
    // Not authorized
    else {
        return res.redirect('/home')
    }
}

function verify(token: string): JwtData | undefined  {
    try {
        return jwt.verify(token, config.jwtSecret) as JwtData
    }
    catch(e) {
        return undefined
    }
}