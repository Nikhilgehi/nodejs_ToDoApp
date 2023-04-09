import mongoose from "mongoose";
export const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName:"newAPI",
}).then(()=>{
    console.log("database connected!!"); 
})
.catch((e)=>{console.log(e)});

}
 