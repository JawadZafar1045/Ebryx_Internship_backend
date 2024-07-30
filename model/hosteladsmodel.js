const {mongoose,Scheme} = require('mongoose')

const hostelSchema= Schema({
    name : {
        type : String,
        required : true,
    },
    description :{
       type : String,
       required : true,
    },
    location :{
        type : String,
        required : true,
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Users' ,
        required : true,
    }

})  
 module.exports = mongoose.model('hostelpost', hostelSchema );