const jwt = require('jsonwebtoken')

const verifyUser = async(req,res)=>{
    const Auth =  req.headers.Authorization || req.headers.authorization;
    if (Auth && Auth.startswith('Bearer')) {
        const token =Auth.split('')[1];
        jwt.verify(token,process.env.SECREAT_KEY,(err,decoded)=>{
            if (err) {
                res.status(404)
                res.send('User is not authenticated')
            }
        
                req.user = user.decoded ;
                next();
                // second Solution
                // const user = await user.findOne(user.id)
            
        })
        if(!token){
            res.status(404)
            res.send('you are not authenticated to visit this page')
        }

    }
}

module.exports = verifyUser;
