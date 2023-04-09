import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const sendcookie=(user,res,message,statusCode=200)=>{
    const token=jwt.sign({_id: user._id },process.env.JWT_SECRET)
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV==="Production");
        res
        .status(statusCode)
        .cookie("token",token,{
            httpOnly:true, 
              maxAge:15*60*1000,
              sameSite:process.env.NODE_ENV==="Production"?"lax":"none",
              sercure:process.env.NODE_ENV==="Production"?false:true,
         })
         .json({
            success:true,
            message,
        });
} 