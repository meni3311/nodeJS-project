const mongoose = require("mongoose");
const Joi = require("joi");

const iceSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    price: Number,
    ingredients: Array,
    sugar_teaspoons: Number,
    image_url: String,
    userId:String
});

const IceModel = mongoose.model("iceCreams", iceSchema);
exports.IceModel = IceModel;


exports.validIce = (_bodyData) =>{
    let joiSchema = Joi.object({
        name:Joi.string().min(5).max(59).required(),
        calories:Joi.number().min(50).max(5000).required(),
        price:Joi.number().min(1).max(60).required(),
        ingredients:Joi.array().min(2).max(17).required(),
        sugar_teaspoons:Joi.number().min(0).max(20).required(),
        image_url:Joi.string().min(10).max(10000).allow(null, "")
    })
    
    return joiSchema.validate(_bodyData);
}