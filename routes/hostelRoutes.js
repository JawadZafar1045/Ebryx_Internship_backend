const express= require('express')
const hostelRoutes = express.Router()
const {HostelAdsController,postretriveByid,postretrive,PostDelete, DetailPage} = require('../Controllers/HostelAdsController')
const verifyUser = require('../Middleware/verifyUser')
const ownership = require('../Middleware/ownership')

// const upload = require('./../config/multerconfig')
const multer = require('multer')


// mutler config
const storage = multer.memoryStorage()  // store image in memory
const upload = multer({storage:storage})


hostelRoutes.post('/posthostel',verifyUser, upload.single('image'),
HostelAdsController).get('/allhostel',postretrive)

hostelRoutes.get('/allRecordbyid',verifyUser,ownership,postretriveByid)
hostelRoutes.delete('/Record-delete/:id',verifyUser, PostDelete)
hostelRoutes.get('/detailpage/:id',verifyUser,DetailPage)

module.exports= hostelRoutes;