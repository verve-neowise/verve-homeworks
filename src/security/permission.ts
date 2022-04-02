import { Role } from "../model/user.model";

const permissions = new Map<Role, string[]>()

function permitFor(role: Role, routes: string[]) {
    permissions.set(role, routes)
}
const openRoutes = [
    'auth/login'
]

permitFor(Role.User, [

])

permitFor(Role.Admin, [
    
])

export default (route: string, role: Role) => {
    if (openRoutes.includes(route)) {
        return true
    }
    return permissions.get(role)!.includes(route)
}