import Express from 'express';
import {ValidationAPI} from "../controllers/user-controller";
import {createCommentValidation, createOrderValidation} from "../validations/order";
import {
    AddCommentToOrderController,
    CreateOrderController,
    DeleteOrderController,
    GetAllOrdersController,
    GetOrderByIdController,
    UpdateStatusController,
    UpdatePublicController,
} from "../controllers/order-controller";
import {isLoggedIn, isLoggedInAPI} from "./helpers";
import multer from "multer";
import AppError from "../utils/appError";
import slug from 'slug'
import path from 'path'

const OrderRouter = Express.Router();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(process.cwd(), 'public', 'img', 'orders');
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const filename = slug(req.body.title).slice(0, 10);
        const extension = file.mimetype.split('/')[1];
        console.log('filename', file, filename);
        cb(null, `post-${req.user.id}-${filename}-${Date.now()}.${extension}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(
            new AppError('Not an image! Please upload only images!', 400),
            false
        );
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

export const uploadPhoto = upload.single('photo');

OrderRouter.get('/', GetAllOrdersController);

OrderRouter.get('/:orderId(\\d+)', GetOrderByIdController);

OrderRouter.post('/orders/new', isLoggedInAPI, createOrderValidation, ValidationAPI, CreateOrderController);

OrderRouter.post('/:orderId(\\d+)/comment', isLoggedInAPI,createCommentValidation, ValidationAPI, AddCommentToOrderController);

OrderRouter.delete('/posts/:orderId(\\d+)', isLoggedInAPI, DeleteOrderController);

// OrderRouter.patch('/:orderId(\\d+)', isLoggedInAPI, ValidationAPI, UpdateStatusController);
OrderRouter.patch('/carrito', isLoggedInAPI, ValidationAPI, UpdateStatusController);

OrderRouter.patch('/:orderId(\\d+)', isLoggedInAPI, ValidationAPI, UpdatePublicController);

export default OrderRouter;