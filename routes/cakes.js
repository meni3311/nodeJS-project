const express = require("express");
const router = express.Router();
const { CakesModel, validCake } = require("../models/cakesModel")

router.get("/", async (req, res) => {

    let perPage = Math.min(req.query.perPage, 10) || 5;
    let page = Math.max(req.query.page - 1, 0) || 0;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    let myFilter = {};
    let s = req.query.s;
    let min = req.query.min || 0;
    let max = req.query.max || 999;

    if (s) {
        let searchExp = new RegExp(s, "i");
        myFilter = { $or: [{ name: searchExp }, { price: 40 }] };
    }
    if(min|max){
        myFilter = { price: { $gte: min, $lte: max } };
    }

    try {
        let data = await CakesModel
            .find(myFilter)
            .limit(perPage)
            .skip(page * perPage)
            .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "sorry, there is a problem in the server. Try again later." })
    }
})

router.post("/", async (req, res) => {
    let validBody = validCake(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    let data = new CakesModel(req.body);
    await data.save();
    res.json({ data });
})

router.delete("/:id", async (req, res) => {
    try {
        let data = await CakesModel.deleteOne({ _id: req.params.id });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ err })
    }
})

router.put("/:id", async (req, res) => {
    let validBody = validCake(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let data = await CakesModel.updateOne({ _id: req.params.id }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ err })
    }
})
module.exports = router;
