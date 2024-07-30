const{mongoose} = require("mongoose")

function Connection(){
    try {
        mongoose.connect("mongodb://localhost:27017/").then(()=>{console.log('Database Connected')})
    } catch (error) {
        console.log("error connecting Database", error)
    }
}

module.exports = Connection; 