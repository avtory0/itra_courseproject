const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const {validateToken} = require('../middlewares/AuthMiddlewares')
const {sign} = require('jsonwebtoken');


router.post("/", async (req, res) => {
  try{
  const {login, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {

    Users.count().then(c => {
      if (c == 0) {
        Users.create({
          login: login,
          email: email,
          password: hash,
          role: "admin",
        });
      } else {
        Users.create({
          login: login,
          email: email,
          password: hash,
        });
      }
      res.json("SUCCESS");
    })  
  });
  const token = sign(
    {login: req.body.login, id: req.body.id},
    "secretstring"
    ); 
    console.log(token)
    res.json({token: token, login: login, id: req.body.id});
} catch(err) {
  console.log(err);
}
});


router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await Users.findOne({ where: { login: login } });

  if (!user) res.json({ error: "User Doesn't Exist" });
  if (user.status === "block") res.json({error: "user was blocked"})

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const token = sign(
      {login: user.login, id: user.id},
      "secretstring"
      );  
      
      console.log(user.role)
      res.json({token: token, login: login, id: user.id, role: user.role});
  });
});

router.post("/googleauth", async(req,res) => {
  const body = req.body;
  console.log(body)
  
  const user = await Users.findOne({ where: {email: body.email}})
  if(!user) {
  await Users.create({
    login: body.login,
    email: body.email,
    password: 123
  })
  const token = sign(
    {login: body.login, id: body.id},
    "secretstring"
    ); 
  // res.json({token: token, login: login, id: body.id});
  res.json({token: token, login: req.body.login, id: req.body.id})
} else {
    const token = sign(
    {login: user.login, id: user.id},
    "secretstring"
    ); 
    res.json({token: token, login: user.login, id: user.id});
  } 
   

})

router.get("/profile/:id", async(req,res) => {
  const userid = req.params.id;
  const user = await Users.findOne({where: {id: userid}})
  res.json(user);
})

router.get("/getall", async(req,res) => {
  const allUsers = await Users.findAll();
  res.json(allUsers)
})

router.get("/check", validateToken, async(req,res) => { //если что убери async
  const id = req.user.id;
  const checkUser = await Users.findOne({where: {id: id}}) 

  res.json({ validate: req.user, check: checkUser });
});

router.put("/blockuser/:id", async(req,res) => {
  const id = req.params.id;
  const checkStatus = await Users.findOne({
    // attributes: ['status'],
    where: { id: id}
  })
  if(checkStatus.status === "normal") {
    await Users.update({status: "block"},{ where: {id: id}})
    res.json("blocked")
  } else {
    await Users.update({status: "normal"},{ where: {id: id}})
    res.json("unblock")
  }
})

router.post("/roleuser/:id", async(req, res) => {
  const id = req.params.id;
  const checkRole = await Users.findOne({
    where: { id: id}
  })

  if(checkRole.role === "user") {
    await Users.update({role: "admin"},{ where: {id: id}})
    res.json("admin now")
  } else {
    await Users.update({role: "user"},{ where: {id: id}})
    res.json("user now")
  }
})

module.exports = router;