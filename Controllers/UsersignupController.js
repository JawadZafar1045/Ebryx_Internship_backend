const Users = require('../model/usersmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const RegisterUser = async (req,res)=>{
    const {username,email,password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        console.log('Please Fill all the fields')
    } 
    const AlreadyRegister = await Users.findOne({email});
    if(AlreadyRegister){
    res.status(400)
    console.log("User Already Register")
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
        username,email,password : hashPassword
    })
    if(user){
    console.log('user created',user)
    res.json(user)
    }
}

const LoginHandler = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
     res.status(400)
     console.log('Both file required')
    }
    const user = await Users.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const Secreat = 'jawad1122'
       const token = jwt.sign({
        User : {
            username : user.username,
            eamil : user.user,
            id : user._id
        },
       },Secreat)
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