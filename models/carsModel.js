const mongoose = require("mongoose");
const Joi = require("joi");

const carsSchema =new mongoose.Schema({
    name:String,
    color:String,
    year:Number
})

const CarsModel = mongoose.model("cars", carsSchema);
exports.CarsModel = CarsModel;

exports.validCars = (_bodyData) =>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(20).required(),
        color:Joi.string().min(2).max(20).required(),
        year:Joi.number().min(10).max(4888).required()
    })
    return joiSchema.validate(_bodyData);

}