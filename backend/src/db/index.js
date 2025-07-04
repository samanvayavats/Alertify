import mongoose from "mongoose"
import { DBNAME } from "../constants.js"

const connectDb = async ()=>{
    try {
       await mongoose.connect(`${process.env.DATABASE_CONNECTION_URL}/${DBNAME}`)
        console.log("DATABASE HAS BEEN CONNECTED ")
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED " , error)
        process.exit(1)
    }
}

export default connectDb