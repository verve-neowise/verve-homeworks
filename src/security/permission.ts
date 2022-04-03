import { Role } from "../model/user.model";

const permissions = new Map<Role, string[]>()

function permitFor(role: Role, routes: string[]) {
    permissions.set(role, routes)
}
const openRoutes = [
    '/auth/login',
    '/auth/register'
]

permitFor(Role.User, [
    '/home',
])

permitFor(Role.Admin, [
    '/admin',
    '/home'
])

export const isOpen = (route: string) => {
    return openRoutes.includes(route)
}

export const isPermitted = (route: string, role: Role) => {
    console.log(route, role);
    return permissions.get(role)!.includes(route)
}