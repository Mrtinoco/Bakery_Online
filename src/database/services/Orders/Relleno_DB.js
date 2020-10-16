import db from '../../models';

async function CreateOrderRelleno(name, imageurl,price) {
    const newRelleno = db.Relleno.create({name, imageurl,price});
    return newRelleno
}

async function GetOneOrderRelleno(rellenoId) {
    return db.Relleno.findByPk(rellenoId)
}

export async function GetAllOrdersRelleno() {
    return db.Relleno.findAll()
}

export async function GetRellenoPrice(rellenoId) {
    const relleno = await db.Relleno.findByPk(rellenoId);
    return relleno.price
}

export async function GetRellenoName(rellenoId) {
    const relleno = await db.Relleno.findByPk(rellenoId);
    return relleno.name
}

async function UpdateRellenoPrice(rellenoId, price) {
    const relleno = db.Relleno.findByPk(rellenoId);
    if (relleno) {
        relleno.price = price;
        await relleno.save();
    }
    return relleno
}