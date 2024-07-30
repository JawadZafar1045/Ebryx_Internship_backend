const hostelpost = require('../model/hosteladsmodel')

const HostelAdsController = async(req,res)=>{
    const{name,description,location} = req.body;
    const userId = req.user.Id
    if (!name || !description || !location) {
        res.status(400)
        console.log('All fields are required to fill')
    }
    const duplicateChecker = await hostelpost.findOne(name)
    if (duplicateChecker) {
        res.status(400)
        console.log('this Hostel is already existed')
    }
    const Hostelads = await hostelpost.InsertOne({
        name,description,location,userId
    })
    res.send(Hostelads);
    console.log('Hostel Ads created Successfully')
    
}

const postretriveByid = async(req,res)=>{
    const userId = req.user.Id
    if (!userId) {
        res.status(400)
        console.log('no id found')
    } else {
        const AdsById = await hostelpost.findOne(userId)
        if (AdsById) {
          res.status(200)
          res.json(AdsById)  
        }
        else{
            res.status(400)
            console.log('No record found against this Id')
        }
    }
}

const postretrive = async (req,res)=>{
    const AllPost = await hostelpost.findAll()
    if(!AllPost){
     res.status(400)
     res.send('no Record Found')
    } 
    res.status(200)
    res.json(AllPost)
}

module.exports = {hostelpost,postretrive,postretriveByid}