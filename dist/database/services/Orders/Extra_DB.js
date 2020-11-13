import db from '../../models';

async function CreateOrderExtra(name, imageurl,price) {
    const newExtra = db.Extra.create({name, imageurl,price});
    return newExtra
}

async function GetOneOrderExtra(extraId) {
    return db.Extra.findByPk(extraId)
}

export async function GetAllOrdersExtra() {
    return db.Extra.findAll()
}

export async function GetExtraPrice(extraId) {
    const extra = await db.Extra.findByPk(extraId);
    return extra.price
}

export async function GetExtraName(extraId) {
    const extra = await db.Extra.findByPk(extraId);
    return extra.name
}

async function UpdateExtraPrice(extraId, price) {
    const extra = db.Extra.findByPk(extraId);
    if (extra) {
        extra.price = price;
        await extra.save();
    }
    return extra
}