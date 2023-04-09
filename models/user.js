import mongoose from "mongoose";
const schema =new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        required:true,
        type:String,
        select:false,

    },
    CreatedAt:{
        requied:true,
        type:Date,
        default : Date.now,

    }
});
export const User=mongoose.model("User", schema);