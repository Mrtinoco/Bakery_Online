import OrderRouter from './orders';
import viewRouter from "./views";

import Express from 'express';
// App routes
import authRouter from './auth-routes';

const principalRouter = Express.Router();

principalRouter.use(viewRouter);

principalRouter.use(authRouter);

principalRouter.use(OrderRouter);

export default principalRouter;