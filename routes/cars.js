const express = require("express");
const router = express.Router();
const {CarsModel,validCars} = require("../models/carsModel");

router.get("/",async(req,res)=>{
    let data = await CarsModel.find({});
    res.json(data);
})

router.post("/",async(req,res)=>{
    let validBody = validCars(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    let data = new CarsModel(req.body);
    await data.save();
    res.json({data});
})


router.delete("/:id", async(req,res)=>{
    try{
        let data = await CarsModel.deleteOne({_id:req.params.id});
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send({err})
    }
})

router.put("/:id", async(req,res)=>{
    let validBody = validCars(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try{
        let data = await CarsModel.updateOne({_id:req.params.id},req.body);
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send({err})
    }
})

module.exports = router;