import { apiError } from "../utlis/apiError.js";
import apiResponse from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import { ContactUs } from "../models/contactUs.model.js";

const reportAnyProblem = asyncHandler(async (req , res) => {
    const { name , email , message} = req.body
    
    if(!name || !email || !message){
      throw new apiError(400 , "all the fields is required")
    }

    const userId  = req.user?._id

    const contact = await ContactUs.create({
        user : userId,
        name : name,
        email : email ,
        message : message
    })

    const isUploaded = await ContactUs.findById(contact?._id)

    if(!isUploaded){
        throw new apiError(500 , "something went wrong on uploading the data")
    }

    return res.status(200)
    .json( new apiResponse(400 ,contact ,"thanks for your feedback , we will contact you soon"))
})

    
export {reportAnyProblem}