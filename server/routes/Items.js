const express = require("express");
const router = express.Router();
const { Items, Collections, Likes } = require("../models");

Items.belongsTo(Collections);

router.get('/:id', async(req,res) => {
    const id = req.params.id;
    const listofItems = await Items.findAll({
        where: {
            CollectionId : id
        },
        include:[Likes]
        
    })
    res.json(listofItems);
})

router.get('/byitem/:id', async(req,res) =>{
    const itemid = req.params.id;
    const item = await Items.findOne({
        where: {
            id: itemid
        }
    })
    res.json(item);
});

router.post("/add", async(req,res) => {
    const data = req.body;
    const checId = data.id
    if(checId==null){
    await Items.create(data);
    res.json(data) }
    else {
        await Items.update(data,{
            where: {
                id: checId
            }
        })
        res.json("get it")
    }
});

router.delete("/delete/:id", async(req,res) => {
    const itemId = req.params.id;
    
    await Items.destroy({
        where: {
            id: itemId
        }
    })
    res.json("deleted Seccesfylly")
});


module.exports = router;