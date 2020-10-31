import {body, param, query} from "express-validator";

export const createCommentValidation = [
    param('orderId').isInt(),
    // body('orderId').isInt(),
    body('comment').isString().isLength({min: 1, max: 350})
];

export const createOrderValidation = [
    // body('userId').isInt(),
    body('breadId').isInt(),
    body('rellenoId').isInt(),
    body('extraId').isInt(),
    body('glutenId').isInt(),

];

