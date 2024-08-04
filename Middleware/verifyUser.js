const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    const Auth = req.headers.Authorization || req.headers.authorization;
    const secreat = "jawad1122"
    
    if (Auth && Auth.startsWith('Bearer ')) {
        const token = Auth.split(' ')[1]; // Extract token
        console.log('Extracted Token:', token); // Log the token to inspect it

        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }
      
        jwt.verify(token, secreat, (err, decoded) => {
            if (err) {
                console.log('JWT Error:', err.message); // Log the error
                return res.status(401).json({ message: 'User is not authenticated' });
            }
            
            req.user = decoded; // Attach the decoded payload to req.user
            console.log(req.user.User.id)
            next(); // Proceed to the next middleware/route handler
        });

    } else {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
};

module.exports = verifyUser