const mongoose = require("mongoose");
const Joi = require("joi");

const cakesSchema = new mongoose.Schema({
    name:String,
    price:Number,
    calories:Number
})

const CakesModel = mongoose.model("cakes", cakesSchema);
exports.CakesModel = CakesModel;


exports.validCake = (_bodyData) =>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(20).required(),
        price:Joi.number().min(1).max(999).required(),
        calories:Joi.number().min(1).max(999).required()
    })
    return joiSchema.validate(_bodyData);
}