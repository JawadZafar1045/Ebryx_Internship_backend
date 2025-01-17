const {mongoose,Schema} = require('mongoose')

const UserSchema = Schema({
    username: {
        type : String
    },
    email: {
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("Users", UserSchema);