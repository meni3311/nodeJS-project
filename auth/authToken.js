const jwt = require("jsonwebtoken");
const {config} = require("../config/secret.js");

exports.authToken = (req,res,next) =>{
    let token = req.header("x-api-key");
    // let token = req.cookies["token"];
    if (!token) {
        return res.status(401).json({msg:"you must to send token"});
    }
    try{
        let decodeToken = jwt.verify(token,config.jwtSecret);
        req.tokenData = decodeToken;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({msg:"token invalid or expired."});
    }
}