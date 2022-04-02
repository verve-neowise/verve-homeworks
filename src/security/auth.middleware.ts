import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../configs/config";
import { JwtData } from "./jwt.model";
import permission from "./permission";

export default function(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization') || req.body.token || req.cookies.token 

    // Not authorized
    if (!token) {
        return res.sendStatus(401)
    }

    let payload = verify(token)

    if (payload) {

        console.log(payload);

        if (permission(req.url, payload.role)) {
            next()
        }
        else {
            return res.sendStatus(403)
        }
    }
    // wrong credentials or token expired
    return res.sendStatus(401)
}

function verify(token: string): JwtData | undefined  {
    try {
        return jwt.verify(token, config.jwtSecret) as JwtData
    }
    catch(e) {
        return undefined
    }
}