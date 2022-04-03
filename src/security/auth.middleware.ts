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
    
    console.log(req.url);

    if (isOpen(req.url)) {
        return next()
    }
    const token = req.session.token
    // Not authorized
    if (!token) {
        req.session.error = "You are not authorized!"
        return res.redirect('/auth/login')
    }

    let payload = verify(token)
    console.log(payload);
    
    // No has token
    if (!payload) {
        req.session.error = "You are not authorized!"
        return res.redirect('/auth/login')
    }

    if (isPermitted(req.url, payload.role)) {
        req.payload = payload
        return next()
    }
    // Not authorized
    else {
        req.session.error = "You are not authorized!"
        return res.redirect('/auth/login')
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