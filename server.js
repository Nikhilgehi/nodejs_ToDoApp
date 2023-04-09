import {app} from "./app.js"
import {connectDb }from "./data/database.js"
connectDb();
console.log(process.env.PORT);
app.listen(process.env.PORT ,()=>{
    console.log(`Server  is working on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})