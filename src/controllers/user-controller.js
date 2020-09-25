import {validationResult} from "express-validator";
import {CreateNewUser, DeleteUserService} from "../database/services/Users/User_Service";
import {GetAllUsers} from "../database/services/Users/User_DB";

export const LogoutController = async (req, res) => {
    req.logout();
    res.redirect('/')
};

export const RegisterController = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({validationErrors: errors.array()});
    }
    try {
        const n_user = await CreateNewUser(req.body);
        res.status(201)
            .json({message: 'Usuario creado con exito!'})
    } catch (_e) {
        if (_e.statusCode) {
            return res.status(_e.statusCode).json({message: _e.message})
        }
        res.status(500).json('Internal server error')
    }
};

export const ValidationAPI = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({validationErrors: errors.array()});
    }
    next()
};

export const GetAllUsersController = async (req, res) => {
    res.status(200).json(await GetAllUsers())
};

export const DeleteUserController = async (req, res) => {
    try {
        await DeleteUserService(+req.params.userId);
        res.status(200).json({message: 'Usuario eliminado con exito!'})
    } catch (_e) {
        if (_e.statusCode) {
            return res.status(_e.statusCode).json({message: _e.message})
        }
        res.status(500).json('Internal server error')
    }
};