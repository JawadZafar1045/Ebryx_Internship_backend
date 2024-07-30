const express= require('express')
const hostelRoutes = express.Router()
const {HostelAdsController,postretriveByid,postretrive} = require('../Controllers/HostelAdsController')
const verifyUser = require('../Middleware/verifyUser')
const ownership = require('../Middleware/ownership')


hostelRoutes.post('/posthostel',verifyUser,HostelAdsController).get('/allhostel',verifyUser,postretrive)

hostelRoutes.get('/allRecordbyid', ownership,postretriveByid)

module.exports= hostelRoutes;