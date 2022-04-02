import { Role } from "../model/user.model";

export type JwtData = {
    userId: number,
    role: Role
}