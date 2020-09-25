import Express from 'express'
import passport from 'passport'
import {validationResult} from "express-validator";
import {loginValidation, registerValidation} from "../validations/auth";
import {
    DeleteUserController,
    GetAllUsersController,
    LogoutController,
    RegisterController
} from "../controllers/user-controller";
import {isLoggedIn} from "./helpers";

const authRouter = Express.Router();

//Auth route
authRouter.post('/login', loginValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validationErrorsArray = errors.array();
        console.log('Validation error', errors.array());
        validationErrorsArray.forEach(valE => {
            req.toastr.error(`Field ${valE.param}: ${valE.msg}`, 'Error de validacion')
        });
        res.locals.pageDescription = 'Login Baguette & More';
        res.locals.pageTitle = 'Login | Baguette & More';
        return res.render('login', {errors: errors.array(), req});
    }
    next()
}, (req, res, next) => {
    let redirectTo = '/';
    if (req.session.redirectTo) {
        redirectTo = req.session.redirectTo;
        req.session.redirectTo = undefined;
    }
    passport.authenticate('local', {
        successRedirect: redirectTo,
        successFlash: {
            type: 'info',
            message: 'Inicio de sesion exitoso.'
        },
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
});

const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.role !== 1) {
        req.flash('error', '');
        return res.status(403).json({message: 'Solo los administradores estan autorizados a realizar esta accion'})
    }
    next()
};

authRouter.get('/users', isLoggedIn, GetAllUsersController);

authRouter.delete('/users/:userId(\\d+)', isLoggedIn, isAdminMiddleware, DeleteUserController);

authRouter.post('/register', registerValidation, RegisterController);

authRouter.get('/logout', LogoutController);

module.exports = authRouter;