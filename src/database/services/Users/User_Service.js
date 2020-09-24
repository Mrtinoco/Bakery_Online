import {CreateUser, DeleteUserById, FindUser, FindUserById, GetAllUsers} from "./User_DB";
import AppError from "../../../utils/appError";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function CreateNewUser(args) {
    if (args.password) {
        args.password = await _Encrypt(args.password, 10);
    }
    return await CreateUser(args);
}

export async function UserByUsername(credentials) {
    return FindUser(credentials);
}

export async function UserSearch(id) {
    return FindUserById(id)
}

export async function GetAllUsersService() {
    return await GetAllUsers()
}

async function _Encrypt(text) {
    return await bcrypt.hash(text, saltRounds);
}

export async function DeleteUserService(userId) {
    if (typeof userId !== 'number') throw new AppError('Debes proporcionar un userid valido', 422);
    return DeleteUserById(userId)
}

