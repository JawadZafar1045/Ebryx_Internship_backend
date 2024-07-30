const ownership =async (req,res,next)=>{
    if(req.user && req.user._id.equals(req.hostelads.id)){
    return next();
    }
    else{
        res.status(404).json('Unautherized User')

    }
   
}

module.exports = ownership