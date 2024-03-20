const express = require("express");
const router = express.Router();

router.get("/check", async(req,res)=> {
    if (req.cookies.mycookie) {
        res.json({msg:req.cookies.mycookie})
    }
    else{
        res.json({msg:"no cookies found"})
    }
})

router.get("/", async (req, res) => {
    res.cookie("mycookie", "this is my cookie", {
        httpOnly: false, expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    })
        .json({ msg: "helloo my first cookie!" })
})

router.delete("/", async (req,res)=> {
    res.clearCookie("mycookie");
    res.json({msg:"cookie deleted"})
})

module.exports = router;