const express = require("express")
const Connection = require("./config/dbconfig")
require("dotenv").config;
const cloudinary = require('cloudinary').v2;
// const upload = require('./config/multerconfig');
const UserRouter= require('./routes/user')
const hostelRoutes = require('./routes/hostelRoutes')
const multer = require('multer')
const cors = require('cors')

const app = express();

app.use(express.json())
Connection();


// // mutler config
// const storage = multer.memoryStorage()  // store image in memory
// const upload = multer({storage:storage})

// // Cloudinary configuration
// cloudinary.config({
//     cloud_name: 'dzmm6qvmz',
//     api_key: 863849527542839,
//     api_secret: 'YGHtK1K6WiwSzZI4n7frL1JLYRg',
//   });

// // Express route for image upload
// app.post('/test', upload.single('image'), async (req, res) => {
//     try {
//       // Upload the file to Cloudinary from memory
//       const result = await cloudinary.uploader.upload_stream({ folder: 'upload' }, (error, result) => {
//         if (error) {
//           return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
//         }

//         const imageUrl = {imageUrl : result.secure_url}
        
//         res.json({ imageUrl: result.secure_url });
//       }).end(req.file.buffer);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error uploading image to Cloudinary' });
//     }
//   });


  

app.get('/user',(req,res)=>{
    res.send("Testing")
})

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use("/api/user", UserRouter)
app.use('/api/hostelads', hostelRoutes)

// const PORT = 9000;

app.listen(9000,console.log("Server Running Fine"))