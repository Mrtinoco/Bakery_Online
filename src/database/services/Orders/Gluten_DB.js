import db from '../../models';

async function CreateOrderGluten(name, imageurl,price) {
    const newGluten = db.Gluten.create({name, imageurl,price});
    return newGluten
}

async function GetOneOrderGluten(glutenId) {
    return db.Gluten.findByPk(glutenId)
}

export async function GetAllOrdersGluten() {
    return db.Gluten.findAll()
}

export async function GetGlutenPrice(glutenId) {
    const gluten = db.Gluten.findByPk(glutenId);
    return gluten.price
}

async function UpdateGlutenPrice(glutenId, price) {
    const Gluten = db.Gluten.findByPk(glutenId);
    if (gluten) {
        gluten.price = price;
        await gluten.save();
    }
    return gluten
}