const express = require('express')
const UserRouter = express.Router()
const {LoginHandler,RegisterUser} = require('../Controllers/UsersignupController')




UserRouter.post('/signup', RegisterUser)

UserRouter.post('/login', LoginHandler)


module.exports = UserRouter;