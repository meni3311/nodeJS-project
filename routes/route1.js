const express = require("express");
const router = express.Router();
const fruits = require("../db/fruits.json");

router.get("/:name",(req,res)=>{
    let params = req.params.name;
    let temp = fruits.find(item=> item.name == params);
    res.json({temp});
})


router.get("/",(req,res) =>{
    res.json({msg:"Hello! i'm route one!"})
})


module.exports = router;



