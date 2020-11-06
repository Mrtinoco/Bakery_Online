import {
    GetAllOrders,
    CreateNewOrder,
    DeleteOrder,
    UpdateOrderPublic,
    UpdateOrderStatus,
    GetOrderById,
    UpdateImage
} from "../database/services/Orders/Order_DB";

import {
    GetBreadPrice
} from "../database/services/Orders/Bread_DB";

import {
    GetExtraPrice
} from "../database/services/Orders/Extra_DB";

import {
    GetGlutenPrice
} from "../database/services/Orders/Gluten_DB";

import {
    GetRellenoPrice
} from "../database/services/Orders/Relleno_DB";

import {matchedData} from "express-validator";
import path from 'path'
import fs from 'fs'
import {createComment} from "../database/services/Orders/Reaction_DB";

export const CreateOrderController = async (req, res, next) => {
    const postData = req.body;
    postData.userId = req.user.id;
    //postData.payment = GetBreadPrice(postData.breadId) + GetExtraPrice(postData.extraId) + GetGlutenPrice(postData.glutenId) + GetRellenoPrice(postData.rellenoId);
    postData.payment = await price(postData.breadId,postData.extraId,postData.glutenId,postData.rellenoId);
    console.log(postData);
    const newOrder = await CreateNewOrder(postData);
    res.redirect('/orders/new')
};

async function price (breadId,extraId,glutenId,rellenoId) {
    let p1 = await GetBreadPrice(breadId);
    let p2 = await GetExtraPrice(extraId);
    let p3 = await GetGlutenPrice(glutenId);
    let p4 = await GetRellenoPrice(rellenoId);
    let priced = p1 + p2 + p3 + p4;
    return priced;
}

export const DeleteOrderController = async (req, res) => {
    await DeleteOrder(req.params.orderId);
    res.status(200).json({message: 'Order deleted!'})
};

export const GetAllOrdersController = async (req, res) => {
    const orders = await GetAllOrders();
    res.status(200).json(orders)
};

export const AddCommentToOrderController = async (req, res) => {
    const data = matchedData(req, {locations: ['body', 'params']});
    try {

        await createComment(data.orderId, req.user.id, data.comment);
        res.status(201).json({message: 'Comentario agregado con exito!'})
    } catch (_e) {
        console.log('Error',_e)
        if (_e.statusCode) {
            return res.status(_e.statusCode).json({message: _e.message})
        }
        res.status(500).json('Internal server error')
    }
};

export const GetOrderByIdController = async (req, res) => {
    const order = await GetOrderById(req.params.orderId);
    if (!order) return res.status(204).end();
    res.status(200).json(order)
};

export const UpdateStatusController = async (req, res, next) => {
    const orderId = req.body.orderId;
    //const orderId = 1;
    console.log(orderId);
    try {
        const post = await UpdateOrderStatus(orderId);
        res.status(200).json({message: 'Status Actualizado!'})
    } catch (_err) {
        console.log(_err);
        res.status(500).json({message: 'Ocurrio un error al actualizar la orden!'})
    }
};

export const UpdatePublicController = async (req, res, next) => {
    const orderId = req.params.orderId;
    const postData = matchedData(req, {locations: ['body']});
    console.log('order data', postData);
    try {
        const post = await UpdateOrderPublic(orderId, postData);
        res.status(200).json({message: 'Publico Actualizado!'})
    } catch (_err) {
        console.log(_err);
        res.status(500).json({message: 'Ocurrio un error al actualizar!'})
    }
};

export const UpdateImageController = async (req, res, next) => {
    const orderId = req.params.orderId;
    const postData = matchedData(req, {locations: ['body']});
    console.log(postData);
    console.log('post data', postData);
    try {
        if (req.file) {
            postData.imageurl = req.file.filename;
        }
        const post = await UpdateImage(orderId, postData);
        res.status(200).json({message: 'Imagen Actualizada!'})
    } catch (_err) {
        console.log(_err);
        res.status(500).json({message: 'Ocurrio un error al actualizar la orden!'})
    }
};