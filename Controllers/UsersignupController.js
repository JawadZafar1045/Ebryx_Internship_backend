const Users = require('../model/usersmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const RegisterUser = async (req,res)=>{
    const {username,email,password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        console.log('Please Fill all the fields')
    } 
    const AlreadyRegister = await Users.findOne(email);
    if(AlreadyRegister){
    res.status(400)
    console.log("User Already Register")
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.insertOne({
        username,email,password : hashPassword
    })
    if(user){
    console.log('user created',user)
    }
}

const LoginHandler = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
     res.status(400)
     console.log('Both file required')
    }
    const user = await Users.findOne(email)
    if(user && (await bcrypt(password,user.password))){
       const token = jwt.sign({
        User : {
            username : user.username,
            eamil : user.user,
            id : user._id
        }
       },process.env.SECREAT_KEY)
       res.status(200)
       res.send(token)
       console.log('User Log in ', token)
    }else{
        res.status(400),
        console.log('Invalid Credential ')
        res.send("Invalid Credential")
    }
   
    
}

module.exports = {RegisterUser,LoginHandler};