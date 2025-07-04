import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config(
    {
       path:'./.env' 
    }
)

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
      console.log(`THE DATABASE IS RUNNING ABSOULETEY ON THE PORT ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.error("THE DATABASE CONNECTION IS FAILED DUE TO ANY PROBLEM !!! " , error)
})

