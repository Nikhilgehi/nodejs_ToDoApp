import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { sendcookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

    export const getMyProfile=(req,res)=>{
      
        res.status(200).json({
            success:true,
            user:req.user,
        })
    };
        export const register=async(req,res,next)=>{
        const{name,email,password}=req.body;
        let user=await User.findOne({email}); 
        if(user)
        {
            res.status(404).json({
            success:false,
            message:"User already exists",
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        user= await User.create({name,email,password:hashedPassword});
        sendcookie(user,res,"Registered Successfully",201); 
       };
     export const login=async(req,res,next)=>{
        const{email,password}=req.body; 
        const user=await User.findOne({email}).select("+password");
        if(!user)
        {
            return next(new ErrorHandler("Invalid Emailid or Password",404));

        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(404).json({
                success:false,
                message:"Invalid Email or Password ",   
            });
 
        } 
        sendcookie(user,res,`Welcome back,${user.name }`,200);
     }; 
     export const logout=async(req,res)=>{
        res.status(200).cookie("token","",
        {
            expires: new Date(Date.now()),
            sameSite:process.env.NODE_ENV==="development"?"lax":"none",
            sercure:process.env.NODE_ENV==="development"?false:true,

        }).json({
            success:true,
            user:req.user,
        })
     }  