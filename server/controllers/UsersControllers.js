const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports.register = async (req,res,next) =>{
   try{
    const{username,email,password} = req.body;
    let usernameCheck = await User.findOne({username})
    if(usernameCheck)
    return res.status(409).json({error:"Username already used"})
    let emailCheck = await User.findOne({email})
    if(emailCheck)
    return res.status(409).json({error: "Email already exist"})
    const hashedPassword = bcrypt.hashSync(password,saltRounds)
    const user = await User.create({
        email,username,password: hashedPassword
    })
    return res.json({status: true,user})
   }
   catch(ex){
    next(ex)
   }
}
module.exports.login = async (req,res,next) =>{
    try{
     const{username,password} = req.body;
     const user = await User.findOne({username})
     if(!user)
     return res.status(409).json({error:"Incorrect username or password"})
     const isPasswordValid = bcrypt.compareSync(password,user.password)
     if(!isPasswordValid)
     return res.status(409).json({error:"Incorrect username or password"})
    return res.json({status: true,user})
    }
    catch(ex){
     next(ex)
    }
 }  