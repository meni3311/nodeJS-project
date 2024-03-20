const experss = require("express");
const bcrypt = require("bcrypt");
const router = experss.Router();
const { UsersModel, validUsers, validLogin, genToken} = require("../models/usersModel");
const { authToken } = require("../auth/authToken");
const {UploadFile} = require("../util/uploadFile")

router.get("/", async (req, res) => {
    let data = await UsersModel.find({},{password:0});
    res.json(data);
})

router.get("/userInfo",authToken, async(req,res)=>{
    let user = await UsersModel.findOne({_id:req.tokenData._id},{password:0});
    res.json(user);
})


router.post("/", async (req, res) => {
    let validBody = validUsers(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = new UsersModel(req.body); 
        data.password = await bcrypt.hash(data.password,10);
        await data.save();
        data.password = "******";
        res.json({ data });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({err:"email already in system or anothr problem."})
    }

})


router.post("/login",async(req,res)=>{
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).send(validBody.error.details);
    }
    let user = await UsersModel.findOne({email:req.body.email});
    if (!user) {
        return res.status(401).json({msg:"User not found"});
    }
    let passValid = await bcrypt.compare(req.body.password, user.password);
    if (!passValid) {
        return res.status(401).json({msg:"passwords not match"});
    }
    let newToken = genToken(user._id, user.role)
    // res.cookie("token", newToken,{httpOnly:false, expires: new Date(Date.now() + 1000*60*60*24)})
    res.json({token:newToken});
})

router.post("/upload", (req,res)=>{
    res.json({msg:"hii upload"})
})






module.exports = router;