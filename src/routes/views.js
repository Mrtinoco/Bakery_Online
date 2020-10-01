// Aqui solo se definiran las rutas que renderizaran una vista, a la que se puede acceder directamente desde el menu de navegacion
import Express from 'express';
import {isLoggedIn} from "./helpers";
import {
    OrderPageController,
    ContactPageController,
    LandingPageController,
    LoginPageController,
    MyOrderPageController,
    NewOrderController,
    RegisterPageController,
    SingleOrderPageController,
    UsersPageController
} from "../controllers/views-controller";
import {RedirectHomeIfIsAuthenticated} from "../controllers/helpers";

const viewRouter = Express.Router();

const WillRenderAView = (req, res, next) => {
    res.locals.req = req;
    res.locals.pageTitle = 'Baguettes and More';
    res.locals.pageDescription = 'Baguettes and More';
    res.locals.isAdmin = () => {
        return !!req.user && (req.user.role === 1)
    };
    res.locals.isOwnerOrAdmin = (postUserId) => {
        return (postUserId === req.user.id) || (req.user.role === 1)
    };
    PassFlashMessagesToToastr(req, res, next);
};

const PassFlashMessagesToToastr = (req, res, next) => {
    const flashError = req.flash('error');
    if (flashError) {
        flashError.forEach(flashM => {
            req.toastr.error(flashM, 'Error')
        })
    }
    const flashInfo = req.flash('info');
    if (flashInfo) {
        flashInfo.forEach(flashM => {
            req.toastr.info(flashM, 'Exito')
        })
    }
    next()
};

viewRouter.get('/', WillRenderAView, LandingPageController);

viewRouter.get('/login', RedirectHomeIfIsAuthenticated, WillRenderAView, LoginPageController);

viewRouter.get('/register', RedirectHomeIfIsAuthenticated, WillRenderAView, RegisterPageController);

viewRouter.get('/contact', WillRenderAView, ContactPageController);

viewRouter.get('/orders', isLoggedIn, WillRenderAView, OrderPageController);

viewRouter.get('/orders/:orderId(\\d+)', isLoggedIn, WillRenderAView,  SingleOrderPageController);

viewRouter.get('/users', isLoggedIn, WillRenderAView, UsersPageController);

viewRouter.get('/my-orders', isLoggedIn, WillRenderAView,  MyOrderPageController);

viewRouter.get('/orders/new', isLoggedIn, WillRenderAView, NewOrderController);

export default viewRouter;
