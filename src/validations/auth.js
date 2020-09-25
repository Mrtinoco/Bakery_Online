import {body, query} from "express-validator";

export const registerValidation = [
    body('username').isString().withMessage('Username debe ser un String').isLength({
        min: 4,
        max: 20
    }).withMessage('Debe ser un string con longitud de 4 a 20 caracteres'),
    body('first_name').isString().isLength({min: 2, max: 60}).withMessage('El nombre debe tener un mas de 2 caracteres y menos de 60'),
    body('last_name').isString().isLength({min: 2, max: 60}).withMessage('El apellido debe tener un minimo de 2 caracteres y un maximo de 60'),
    body('address').isString().isLength({min: 2, max: 200}).withMessage('La direccion debe tener un minimo de 4 caracteres y un maximo de 200'),
    // body('email').isEmail(),
    body('password').isString().withMessage('Password debe ser un string').isLength({min: 4, max: 50})
];

export const loginValidation = [
    body('username').isString().isLength({min: 4, max: 20}).withMessage('Debe tener una longitud de 4 a 20 caracteres'),
    body('password').isString().isLength({
        min: 4,
        max: 50
    }).withMessage('Debe tener una longitud minima de 4 caracteres y una maxima de 50')
];

export const getUserInfo = [
    query('userId').isInt()
];
