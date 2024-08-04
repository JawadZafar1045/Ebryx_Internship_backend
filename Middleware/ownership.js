const hostelpost = require("../model/hosteladsmodel");
const ownership = async (req, res, next) => {
  try {
    const hostelads = await hostelpost.find({ userId: req.user.User.id });
    console.log(hostelads);
    if (!hostelads.length) {
      return res.status(404).json({ message: "No hostel found" });
    }

    // Store the retrieved hostel ads in request object
    req.hostelads = hostelads;

    // Proceed to next middleware/controller
    return next();

  } catch (error) {
    console.error("Ownership Middleware Error:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = ownership;
