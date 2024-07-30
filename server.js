const express = require("express")
const Connection = require("./config/dbconfig")
require("dotenv").config;
const UserRouter= require('./routes/user')

const app = express();

app.use(express.json())
Connection();

app.get('/user',(req,res)=>{
    res.send("Testing")
})


app.use("/api", UserRouter)
app.use('/api/hostelads', hostelRoutes)

// const PORT = 9000;

app.listen(process.env.PORT,console.log("Server Running Fine"))