const express = require("express");
const router = express.Router();
const {ConsolesModel,validConsoles} = require("../models/consolesModel");
const { authToken } = require("../auth/authToken");

router.get("/", async(req,res)=>{
    let data = await ConsolesModel.find({});
    res.json(data);
})

router.post("/", async(req,res)=>{
    let validBody = validConsoles(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    let data = new ConsolesModel(req.body);
    await data.save();
    res.json({data});
})

router.delete("/:id", async(req,res)=>{
    try{
        let data = await ConsolesModel.deleteOne({_id:req.params.id});
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send({err})
    }
})

router.put("/:id", async(req,res)=>{
    let validBody = validConsoles(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try{
        let data = await ConsolesModel.updateOne({_id:req.params.id},req.body);
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send({err})
    }
})

module.exports = router;