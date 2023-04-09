class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message); //super is parent class ka constructor...
        this.statusCode=statusCode;
    }
}
export const errorMiddleware=((err,req,res,next)=>{
    err.message=err.message || "Internal server error";
    err.statusCode=err.statusCode||500;
    return  res.status(err.statusCode).json({
        success:false,
        message:"Invalid Id",
      });
})
export default ErrorHandler;