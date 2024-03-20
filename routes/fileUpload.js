const express = require("express");
const path = require("path");
const router = express.Router();
const {UploadFile} = require('../util/uploadFile')

router.get("/", (req, res) => {
    res.json({ msg: "upload work!" })
})

router.post("/", async (req, res) => {


    try{
        let data = await UploadFile(req, "myFile", "", 5, [".png", ".jpg", ".gif", ".jpeg", ".svg"])
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(400).json({err})
    }
})

module.exports = router;