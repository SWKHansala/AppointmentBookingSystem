/* import jwt from "jsonwebtoken";

// user authentication
const authUser = async (req,res,next) => {
    try {

        const {token} = req.headers
        if (!token) {
            return res.json({success:false,message:'Not Authorized Login Again'})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        
        req.body.userId = token_decode.id

        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser */

// ...existing code...
import jwt from "jsonwebtoken";

// user authentication
const authUser = async (req,res,next) => {
    try {
        // accept Authorization: Bearer <token> or token header
        const raw = req.headers['authorization'] || req.headers['token'] || req.headers['a-token'] || req.headers['aToken']
        const token = raw && raw.startsWith('Bearer ') ? raw.split(' ')[1] : raw

        if (!token) {
            return res.status(401).json({success:false,message:'Not Authorized Login Again'})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        // don't mutate req.body — attach user info to req
        req.userId = token_decode.id
        req.user = token_decode

        next()

    } catch (error) {
        console.log('authUser error:', error.message)
        return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
    }
}

export default authUser
// ...existing code...