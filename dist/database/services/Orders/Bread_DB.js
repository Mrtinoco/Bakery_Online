import db from '../../models';

async function CreateOrderBread(name, imageurl,price) {
    const newBread = db.Bread.create({name, imageurl,price});
    return newBread
}

async function GetOneOrderBread(breadId) {
    return db.Bread.findByPk(breadId)
}

export async function GetAllOrdersBread() {
    return db.Bread.findAll()
}

export async function GetBreadPrice(breadId) {
    const bread = await db.Bread.findByPk(breadId);
    return bread.price
}

export async function GetBreadName(breadId) {
    const bread = await db.Bread.findByPk(breadId);
    return bread.name
}

async function UpdateBreadPrice(breadId, price) {
    const bread = db.Bread.findByPk(breadId);
    if (bread) {
        bread.price = price;
        await bread.save();
    }
    return bread
}