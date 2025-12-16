/* import jwt from "jsonwebtoken";

// admin authentication
const authAdmin = async (req,res,next) => {
    try {

        const {atoken} = req.headers
        if (!atoken) {
            return res.json({success:false,message:'Not Authorized Login Again'})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'Not Authorized Login Again'})
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authAdmin */

/* import jwt from "jsonwebtoken";

// Admin authentication
const authAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check if Authorization header exists
    if (!token) 
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });

    // Extract token: "Bearer xyz" → "xyz"
    token = token.split(" ")[1];

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token match admin credentials
    if (
      token_decode !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    )
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });

    next(); // allow access
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
*/ 

import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    console.log("Incoming Headers:", req.headers);   // Debug

    // Accept token from ANY of these headers
    let token =
      req.headers.atoken ||
      req.headers.atoken ||
      req.headers["a-token"] ||
      req.headers["atoken"] ||
      req.headers["aToken"] ||
      req.headers.authorization?.replace("Bearer ", "");

    console.log("Extracted Token:", token); // Debug

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if matching admin credentials
    if (
      decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();

  } catch (error) {
    console.log("JWT ERROR:", error);
    return res.json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authAdmin;

