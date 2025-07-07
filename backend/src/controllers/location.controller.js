import { apiError } from "../utlis/apiError.js";
import apiResponse from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import { Location } from "../models/location.model.js";

const getLocation = asyncHandler(async (req, res) => {
    const { lat , lng } = req.body
          
    if(!lat || !lng){
        throw new apiError(400 ,"the loction is required")
    }

    const owner = req.user?._id

    if (!owner) {
        throw new apiError(401, "Invalid User or not getting the id of the user")
    }

    const location = await Location.create({
        owner: owner,
        lat : lat ,
        lng : lng
    })

    // const checkLocation = await Location.findById(location?._id)

    // if(!checkLocation){
    //     throw new apiError(500 , "Can not store the locaion Something went wrong")
    // }

    return res.status(200)
    .json(new apiResponse(200 , location , "locaion has been stored Successfully"))

})

export {
    getLocation
}