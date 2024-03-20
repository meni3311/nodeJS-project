const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const {config} = require("../config/secret.js");

const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    role:{
        type:String, default:"regular"
    },
    date:{
        type:Date, default:Date.now()
    },
    img_url:String
});
exports.UsersModel = mongoose.model("users", usersSchema);

exports.genToken = (_userId, role) => {
    let token = jwt.sign(({_id:_userId, role}), config.jwtSecret, ({expiresIn:"1440mins"}));
    return token;
}


exports.validUsers = (_bodyData) =>{
    let joiSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:Joi.string().min(2).max(56).required(),
    password:Joi.string().min(2).max(43).required(),
    phone:Joi.string().min(9).max(15).required()
    })


    return joiSchema.validate(_bodyData);
}

exports.validLogin = (_bodyData) =>{
    let joiSchema = Joi.object({
    email:Joi.string().min(2).max(56).required(),
    password:Joi.string().min(2).max(43).required()
    })


    return joiSchema.validate(_bodyData);
}