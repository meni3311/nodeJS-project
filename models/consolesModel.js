const mongoose = require("mongoose");
const Joi = require("joi");

const consolesSchema = new mongoose.Schema({
    name:String,
    year:Number,
    company:String
})

const ConsolesModel = mongoose.model("consoles", consolesSchema);
exports.ConsolesModel = ConsolesModel;

exports.validConsoles = (_bodyData) =>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(20).required(),
        year:Joi.number().min(10).max(4888).required(),
        company:Joi.string().min(2).max(20).required(),
    })
    return joiSchema.validate(_bodyData);

}