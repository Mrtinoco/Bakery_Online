import sequelize from 'sequelize'
import AppError from "../../../utils/appError";
import db from '../../models';

const Op = db.Sequelize.Op;

export async function FindByWhereClause(where) {
    const user = await db.User.findOne({
        where
    });

    if (user) return user;
    return null;
}

/**
 * @param {string} username
 * @return {db.User,null}
 */
export async function FindUser(username) {
    if (!username) throw new Error('Argumento invalido: username');

    return FindByWhereClause({username: username.toLowerCase()})
}

/**
 * @param {string} username
 * @return {db.User,null}
 */
export async function FindUserById(id) {
    if (!id) throw new Error('Argumento invalido: id');

    return FindByWhereClause({id})
}

export async function GetAllUsers() {
    return db.User.findAll({
        attributes:
            [
                'id', 'first_name', 'last_name','address', 'createdAt', 'updatedAt', [sequelize.fn('COUNT', sequelize.col('orders.id')), 'orderCount']
            ],
        include: [
            {
                model: db.Order,
                as: 'orders',
                attributes: []
            }
        ],
        group: ['User.id', 'first_name', 'last_name','address', 'User.createdAt', 'User.updatedAt']
    })
}

export async function DeleteUserById(userId) {
    const user = await db.User.findByPk(userId);
    if (user) {
        await user.destroy()
    }
    return user
}

export async function CreateUser(args) {
    // if (!args.email) throw new Error('Invalid argument: email');
    if (!args.username) throw new Error('Invalid argument: username');
    if (!args.password) throw new Error('Invalid argument: password');
    if (!args.address) throw new Error('Invalid argument: address');
    if (!args.role) args.role = 0;

    const oldUser = await db.User.findOne({where: {username: args.username}});
    if (oldUser) {
        throw new AppError('Ya existe un usuario con el username ' + args.username, 403);
    }

    const user = await db.User.create({
        email: args.email,
        username: args.username.toLowerCase(),
        password: args.password,
        address: args.address,
        first_name: args.first_name,
        last_name: args.last_name,
        role: args.role,
    });

    return user;
}

