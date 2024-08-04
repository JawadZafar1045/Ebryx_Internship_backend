const hostelpost = require('../model/hosteladsmodel')
const cloudinary = require('cloudinary').v2

const HostelAdsController = async(req,res)=>{
    const{name,description,location,} = req.body;
    const userId = req.user.User.id
    console.log(userId)

    // Cloudinary configuration
cloudinary.config({
    cloud_name: 'dzmm6qvmz',
    api_key: 863849527542839,
    api_secret: 'YGHtK1K6WiwSzZI4n7frL1JLYRg',
  });
    
  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'upload' }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }).end(req.file.buffer);
    });

    // Get the uploaded image URL
    const imageUrl = result.secure_url;

    // Check for duplicate hostel name
    const duplicateChecker = await hostelpost.findOne({ name });
    if (duplicateChecker) {
      return res.status(400).json({ message: 'This hostel already exists' });
    }

    // Create the hostel ad with imageUrl
    const Hostelads = await hostelpost.create({
      name,
      description,
      location,
      imageUrl, // Store the imageUrl in the database
      userId,
    });

    res.status(201).json(Hostelads);
    console.log('Hostel Ad created successfully');
  } catch (error) {
    res.status(500).json({ message: 'Failed to create hostel ad' });
    console.log('Error creating hostel ad:', error.message);
  }
};

const postretriveByid = async(req,res)=>{
    console.log("postretriveByid Controller Hit");
    try {
        // Retrieve the hostel ads from the request object
        const hostelads = req.hostelads;
        console.log("Hostel Ads in Controller:", hostelads);
    
        if (hostelads && hostelads.length) {
          res.status(200).json(hostelads);
        } else {
          res.status(404).json({ message: 'No records found against this ID' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error retrieving posts by ID:', error.message);
      }
    };

const postretrive = async (req,res)=>{
    const AllPost = await hostelpost.find()
    if(!AllPost){
     res.status(400)
     res.send('no Record Found')
    } 
    res.status(200)
    res.json(AllPost)
}

const PostDelete= async (req,res)=>{
  try {
    const hostelId = req.params.id;

    // Find the hostel by ID and delete it
    const hostel = await hostelpost.findByIdAndDelete(hostelId);

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.status(200).json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const DetailPage= async (req,res)=>{
  try {
    const hostel = await hostelpost.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {HostelAdsController,postretrive,postretriveByid,PostDelete,DetailPage}