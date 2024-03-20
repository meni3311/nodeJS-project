const express = require("express");
const router = express.Router();
const { authToken } = require("../auth/authToken");
const { IceModel, validIce } = require("../models/iceModel");

router.get("/", async (req, res) => {
    let data = await IceModel.find({})
        .limit(10)
    res.json(data);
})


router.post("/", authToken, async (req, res) => {
    let validBody = validIce(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = new IceModel(req.body);
        data.userId = req.tokenData._id;
        await data.save();
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }

})

router.put("/:id", authToken, async (req, res) => {
    let validBody = validIce(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data;
        if (req.tokenData.role === "admin") {
            data = await IceModel.updateOne({ _id: req.params.id}, req.body);
        }
        else {
            data = await IceModel.updateOne({ _id: req.params.id, userId: req.tokenData._id }, req.body);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ err })
    }
})


router.delete("/:id", authToken, async (req, res) => {
    try {
        let data;
        if (req.tokenData.role === "admin") {
            data = await IceModel.deleteOne({ _id: req.params.id});
        }
        else {
            data = await IceModel.deleteOne({ _id: req.params.id, userId: req.tokenData._id });
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ err })
    }
})

module.exports = router;