const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
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
    
    res.json({token: token, login:req.body.login, id: req.body.id});
} catch(err) {
  console.log(err);
}
});


router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await Users.findOne({ where: { login: login } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const token = sign(
      {login: user.login, id: user.id},
      "secretstring"
      );  
      

      res.json({token: token, login: login, id: user.id});
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


router.get("/check", validateToken, (req,res) => {
  res.json(req.user);
});

module.exports = router;