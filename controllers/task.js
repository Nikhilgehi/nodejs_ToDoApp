import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/task.js";
export const newTask=async(req,res,next)=>{
    const {title,description} =req.body;
    console.log("working 1");
    await Task.create({
        title,
        description,
        user:req.user
        
    }) 
    console.log("working 2");
    res.status(201).json({
        success:true, 
        message:"Task added Successfully",
    })
};
export const getMyTask=async(req,res,next)=>{

  const userid= req.user._id;
  const task=await Task.find({ user:userid });
  res.status(200).json({
    success:true,
    task,
  });
};

export const updateTask=async(req,res,next)=>{
  const {id}=req.params;
  const task= await Task.findById(id);
  if(!task)
  {
    return next(new ErrorHandler("Task not found",404));
  }
  task.isCompleted= !task.isCompleted;
  await task.save();
  res.status(200).json({
    success:true,
    message:"Task Updated!",
  });
};  
export const deleteTask=async(req,res,next)=>{
  const {id}=req.params.id;
  const task=Task.findById(id);
  if(!task)
  {
    return next(new ErrorHandler("Task Not Found",404));
  }
  await task.deleteOne(id);
  res.status(200).json({
    success:true,
    message:"Task Deleted",
  });
  
};