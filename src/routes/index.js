import OrderRouter from './orders'
import viewRouter from "./views";

const Express = require('express');
// App routes
const authRouter = require('./auth-routes');

const principalRouter = Express.Router();

principalRouter.use(viewRouter);

principalRouter.use(authRouter);

principalRouter.use('/orders', OrderRouter);

module.exports = principalRouter;