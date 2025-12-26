/* import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js"

// doctor authentication
const authDoctor = async (req,res,next) => {
    try {
        // accept Authorization: Bearer <token> or token header
        const raw = req.headers['authorization'] || req.headers['token'] || req.headers['d-token'] || req.headers['dToken']
        const token = raw && raw.startsWith('Bearer ') ? raw.split(' ')[1] : raw

        if (!token) {
            return res.status(401).json({success:false,message:'Not Authorized Login Again'})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        // don't mutate req.body — attach user info to req
        req.body.docId = token_decode.id
        req.doctor = token_decode

        next()

    } catch (error) {
        console.log('authUser error:', error.message)
        return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
    }
}

export default authDoctor */

import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const token =
      req.headers.dtoken ||
      req.headers["d-token"] ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.docId = decoded.id;

    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authDoctor;
