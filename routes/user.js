const express = require('express')
const UserRouter = express.Router()
const {LoginHandler,RegisterUser} = require('../Controllers/UsersignupController')




UserRouter.post('/register', RegisterUser)

UserRouter.post('/login', LoginHandler)


module.exports = UserRouter;