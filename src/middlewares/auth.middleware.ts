import { NextFunction, Request, Response } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
    console.log("auth.middleware: " + req.url);
    next()
}