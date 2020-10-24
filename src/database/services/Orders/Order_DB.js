import db from '../../models';

export async function GetAllOrders(extraOptions = {}) {
    return db.Order.findAll({
        include: [{
                model: db.User, as: 'buyer',
                attributes: ['id', 'fullName', 'first_name', 'last_name','address']
            }],
        ...extraOptions
    })
}

export async function GetAllUserOrders(userId) {
    return GetAllOrders({where: {userId}, order: [['createdAt', 'DESC']]})
}


export async function GetAllUserPayOrders(userId) {
    return GetAllOrders({where: {userId, status: "Pagado"},order: [['createdAt', 'DESC']]})
}

export async function GetAllUserPendOrders(userId) {
    return GetAllOrders({where: {userId, status: "Pendiente"},order: [['createdAt', 'DESC']]})
}

export async function GetCartOrders(userId) {
    return GetAllOrders({where: {userId, status: "Pendiente"},order: [['createdAt', 'DESC']]})
}

export async function CreateNewOrder(postData) {
    if (!postData.breadId) throw new Error('Invalid argument: breadId');
    if (!postData.rellenoId) throw new Error('Invalid argument: rellenoId');
    if (!postData.extraId) throw new Error('Invalid argument: extraId');
    if (!postData.glutenId) throw new Error('Invalid argument: glutenId');
    if (!postData.payment) throw new Error('Invalid argument: payment');

    console.log('create new order', postData);
    return db.Order.create(postData)
}

export async function GetLastTenOrders() {
    return db.Order.findAll({
        include: [
            {
                model: db.User, as: 'buyer',
                attributes: ['id', 'fullName', 'first_name', 'last_name','address']
            },
            {
                model: db.Bread,
                as: 'bread',
                attributes: ['name', 'price']
            },
            {
                model: db.Relleno,
                as: 'relleno',
                attributes: ['name', 'price']
            },
            {
                model: db.Extra,
                as: 'extra',
                attributes: ['name', 'price']
            },
            {
                model: db.Gluten,
                as: 'gluten',
                attributes: ['name', 'price']
            }
        ], order: [['createdAt', 'DESC']], limit: 11, offset: 0
    })
}

export async function DeleteOrder(orderId) {
    if (!orderId) throw new Error('Invalid argument: orderId');
    const order = await db.Order.findByPk(orderId);
    if (order) {
        await order.destroy()
    }
}

export async function UpdateOrderPublic(orderId, postData) {
    if (!orderId) throw new Error('Invalid argument: orderId');
    if (!postData.public) throw new Error('Invalid argument: postData.public');

    const order = await db.Order.findByPk(orderId);
    if (order) {
        // Give like
        order.public = postData.public;
        await order.save()
    }
    return order
}

export async function UpdateOrderStatus(orderId) {
    if (!orderId) throw new Error('Invalid argument: orderId');

    const orders = await GetAllUserPendOrders(orderId);

    if (orders) {
        // Give like
        for (let order of orders) {
            order.status = 'Pagado';
            await order.save()
        }
    }
    return orders
}

export async function GetOrderById(orderId) {
    return db.Order.findByPk(orderId, {
        include: [ {
            model: db.OrderReaction,
            as: 'reactions',
            include: [{
                model: db.User, as: 'buyer',
                attributes: ['id', 'fullName', 'first_name', 'last_name','address']
            }]
        }, {
            model: db.User, as: 'buyer',
            attributes: ['id', 'fullName', 'first_name', 'last_name','address']
        }, {
            model: db.Bread,
            as: 'bread'
        },{
            model: db.Relleno,
            as: 'relleno'
        },{
            model: db.Extra,
            as: 'extra'
        },{
            model: db.Gluten,
            as: 'gluten'
        }, {
            model: db.User, as: 'buyer',
            attributes: ['id', 'fullName', 'first_name', 'last_name','address']
        }]
    })
}