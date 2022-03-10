const User = require('../Models/userModel')
const jwt = require('jsonwebtoken');

const signup = (req, res)=>{

const user = new User()
user.name = req.body.name
user.email = req.body.email
user.password = req.body.password
user.save((err, done)=>{
  console.log(err)
  if(err) return res.status(500).send("signup failed")
  res.status(201).send("signed up successfully")

})
}

const login = (req, res)=>{
User.findOne({email:req.body.email},(err,user)=>{
  if(err || !user) return res.status(404).send("user not found")

  if(user.comparePassword(req.body.password)){
    const token = jwt.sign({ id:user._id },'thisismysecret');
    res.send(token)
    res.redirect('http://localhost:3000')
  }else{
    res.send("could not login")
  }
 
})
}

module.exports = {
  signup,
  login
}