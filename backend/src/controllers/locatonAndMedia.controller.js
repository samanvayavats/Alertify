import { LocationAndMedia } from "../models/locatonAndMedia.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utlis/apiError.js";
import apiResponse from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import { uploadeCloudinary } from "../utlis/cloudinary.js"


const getLocationAndMEdiaAndCaption = asyncHandler(async (req, res) => {
    const { caption, lat, lng } = req.body;
    console.log("body ",req.body)
    console.log("file ",req.files)
    const userId = req.user?._id; // assuming you're using auth middleware

    if (!caption || !lat || !lng) {
        throw new apiError(400, " the caption lat and lng is required")
    }

    if (!req.files || (!req.files.images && !req.files.video)) {
        return new apiError(400, "Atleast one media is reuired")
    }

    const uploadPhotos = []

    if (req.files.images) {
        for (let images of req.files.images) {
            const result = await uploadeCloudinary(images.path) || null
            uploadPhotos.push(result.url)
        }
    }

    if (uploadPhotos.length <= 0) {
        throw new apiError(500, "no image is uploaded")
    }

    let uploadVideo ;
    if (req.files.video && req.files.video.length > 0) {
        uploadVideo = await uploadeCloudinary(req.files.video[0].path) || null
    }

    if (!uploadVideo.url) {
        throw new apiError(500, "video not uploaded")
    }

    const locationAndMedia = await LocationAndMedia.create({
        user: userId,
        lat : lat,
        lng : lng,
        caption : caption,
        photos: uploadPhotos,
        video: uploadVideo.url,
        uniqueId: String(crypto.randomUUID()),
    })

    const checkUser = await LocationAndMedia.findById(locationAndMedia?._id)

    if(!checkUser){
        throw new apiError(500 , "media and location not uploaded ")
    }

    return res.status(200)
    .json(new apiResponse(200 , checkUser , 
        "media , location and the caption has been uploaded Successfully"
    ))

})


export {
    getLocationAndMEdiaAndCaption
}