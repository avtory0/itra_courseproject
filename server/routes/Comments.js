const express = require("express");
const router = express.Router();
const { Comments} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares')


router.get("/:id", async(req,res) => {
    const itemId = req.params.id;
    const listOfComments = await Comments.findAll({
        where: {
            ItemId: itemId
        }
    });
    res.json(listOfComments);
})

router.post("/add", validateToken, async(req,res) => {
    const body = req.body;
    body.UserId = req.user.id;
    
    await Comments.create(body);
    res.json(body);
})

router.delete("/delete/:id", validateToken, async(req,res) => {
    const id = req.params.id;
    await Comments.destroy({
        where: {
            id: id
        }
    })
    res.json('success')
})

module.exports = router;