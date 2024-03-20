const express = require("express");
const router = express.Router();
const ar = require("../db/fruits.json")

router.get("/min",(req,res)=>{
    let min = req.query.min;
    const temp_ar = ar.filter(item => {return Number(item.price) > min});
    res.json({temp_ar});
})

router.get("/max", (req,res)=>{
    let max = req.query.max;
    const temp_ar2 = ar.filter(item => {return Number(item.price) < max});
    res.json({temp_ar2});
})

router.get("/", (req,res) => {
    res.json({ar})
})




module.exports = router;


