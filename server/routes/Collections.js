const express = require("express");
const router = express.Router();
const { Collections,Users } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares')

Collections.belongsTo(Users);

router.get("/", validateToken, async(req,res) => {
    const UserId = req.user.id;
    console.log(req.user.login)
    const listOfCollect = await Collections.findAll({
        where: {
            UserId: UserId
        }
    });
    
    res.json(listOfCollect);
});

router.get("/check/:id", async(req,res) => {
    const id = req.params.id;
    const collect = await Collections.findOne({
        where: {
            id: id,
        }
    })
    res.json(collect)
})

router.post("/add/:id", validateToken, async(req,res) => {
    const id = req.params.id;
    const post = req.body;
    post.UserId = req.user.id;
    const check =  await Collections.findOne({
        where: {
            id: id
        }
    })
    if(check) {
        await Collections.update(post, {
            where: {
                id: id
            }
        })
        res.json(post)
    } else {
        await Collections.create(post);
        res.json(post)
    }
    // await Collections.create(post);
    // res.json(post)
});

router.delete("/:collectId", async(req,res) => {
    const collectId = req.params.collectId;
    
    await Collections.destroy({
        where: {
            id: collectId
        }
    })
    res.json("deleted Seccesfylly")
});

router.get("/getall", async(req,res) => {
    const listOfCollection = await Collections.findAll({
        include: [{
            model: Users,
            required: false,
            attributes: ["login"]
        }]
    });
    res.json(listOfCollection)
});


module.exports = router;