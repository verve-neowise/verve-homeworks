import config from "./configs/config";
import path from 'path'

config.setup(path.join(__dirname, '../.env'))

import User, { Role } from "./model/user.model"
import userStorage from "./storage/user.storage"

userStorage.addUser(new User(
    0, "admin", "admin", "Neowise", "", -1, Role.Admin
))

userStorage.addUser(new User(
    0, "user", "1234", "User", "", -1, Role.User
))