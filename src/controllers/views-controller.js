import {GetAllUserOrders, GetLastTenOrders, GetOrderById, GetAllUserPayOrders,GetCartOrders,GetAllAdminOrders} from "../database/services/Orders/Order_DB";
import {GetAllOrdersBread,GetBreadName} from "../database/services/Orders/Bread_DB";
import {GetAllOrdersExtra, GetExtraName} from "../database/services/Orders/Extra_DB";
import {GetAllOrdersGluten, GetGlutenName} from "../database/services/Orders/Gluten_DB";
import {GetAllOrdersRelleno, GetRellenoName} from "../database/services/Orders/Relleno_DB";

import {GetAllUsers, GetAllUsersService} from "../database/services/Users/User_Service";

export const LandingPageController = async (req, res) => {
    const lastTenOrders = await GetLastTenOrders();
    res.render('index', {req, lastFourPosts: lastTenOrders || []});
};

export const AllOrdersPageController = async (req, res) => {
    const aorders = await GetAllAdminOrders();
    for (let aorder of aorders) {
        let abid = aorder.breadId;
        let aeid = aorder.extraId;
        let agid = aorder.glutenId;
        let arid = aorder.rellenoId;
        aorder.breadId = await GetBreadName(abid);
        aorder.extraId = await GetExtraName(aeid);
        aorder.glutenId = await GetGlutenName(agid);
        aorder.rellenoId = await GetRellenoName(arid);
    }
    res.render('all-orders', {orders: aorders || []});
};

export const OrderPageController = async (req, res) => {
    const BreadCategories = await GetAllOrdersBread();
    const ExtraCategories = await GetAllOrdersExtra();
    const GlutenCategories = await GetAllOrdersGluten();
    const RellenoCategories = await GetAllOrdersRelleno();
    console.log(req);
    res.render('blog', {req, BreadCategories,ExtraCategories,GlutenCategories,RellenoCategories});
};

export const SingleOrderPageController = async (req, res) => {
    console.log(req.params);
    const order = await GetOrderById(req.params.orderId);
    console.log(order);
    res.render('single-order', {req, order});
};

export const MyOrderPageController = async (req, res) => {
    const orders = await GetAllUserPayOrders(req.user.id);

    for (let order of orders) {
        console.log(order);
        let bid = order.breadId;
        let eid = order.extraId;
        let gid = order.glutenId;
        let rid = order.rellenoId;
        order.breadId = await GetBreadName(bid);
        order.extraId = await GetExtraName(eid);
        order.glutenId = await GetGlutenName(gid);
        order.rellenoId = await GetRellenoName(rid);
    }
    res.render('my-orders', {orders: orders || []});
};

export const MyCartPageController = async (req, res) => {
    const orders = await GetCartOrders(req.user.id);
    let pago = 0;
    for (let order of orders) {
        console.log(order);
        let bid = order.breadId;
        let eid = order.extraId;
        let gid = order.glutenId;
        let rid = order.rellenoId;
        order.breadId = await GetBreadName(bid);
        order.extraId = await GetExtraName(eid);
        order.glutenId = await GetGlutenName(gid);
        order.rellenoId = await GetRellenoName(rid);
        pago = pago + order.payment;
    }

    res.render('carrito', {orders: orders,pago:pago || []});
};


export const ContactPageController = (req, res) => res.render('contact');

export const UsersPageController = async (req, res) => {
    const users = await GetAllUsersService();
    console.log('Users ', users);
    users.forEach(user => {
        console.log('U S E R', user.id, user.first_name, user.orderCount)
    })
    res.render('users', {users});
};

export const LoginPageController = async (req, res) => {
    if (req.query.redirectTo) {
        req.session.redirectTo = req.query.redirectTo;
    }
    console.warn('/*/*/*/*/*/*/*/*/* ', req.flash('error'));

    res.render('login', {errors: req.flash('error'), req: req})
};

export const RegisterPageController = (req, res) => {
    res.render('register', {req})
};

export const NewOrderController = async (req, res) => {
    const BreadCategories = await GetAllOrdersBread();
    const ExtraCategories = await GetAllOrdersExtra();
    const GlutenCategories = await GetAllOrdersGluten();
    const RellenoCategories = await GetAllOrdersRelleno();
    res.render('new-order', {BreadCategories,ExtraCategories,GlutenCategories,RellenoCategories})
};