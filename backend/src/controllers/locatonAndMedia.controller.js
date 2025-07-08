import { LocationAndMedia } from "../models/locatonAndMedia.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utlis/apiError.js";
import apiResponse from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import { uploadeCloudinary } from "../utlis/cloudinary.js"
import mongoose from "mongoose";

const getLocationAndMEdiaAndCaption = asyncHandler(async (req, res) => {
    const { caption, lat, lng } = req.body;
    console.log("body ", req.body)
    console.log("file ", req.files)
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

    let uploadVideo;
    if (req.files.video && req.files.video.length > 0) {
        uploadVideo = await uploadeCloudinary(req.files.video[0].path) || null
    }

    if (!uploadVideo.url) {
        throw new apiError(500, "video not uploaded")
    }

    const locationAndMedia = await LocationAndMedia.create({
        user: userId,
        lat: lat,
        lng: lng,
        caption: caption,
        photos: uploadPhotos,
        video: uploadVideo.url,
        uniqueId: String(crypto.randomUUID()),
    })

    const checkUser = await LocationAndMedia.findById(locationAndMedia?._id)

    if (!checkUser) {
        throw new apiError(500, "media and location not uploaded ")
    }

    return res.status(200)
        .json(new apiResponse(200, checkUser,
            "media , location and the caption has been uploaded Successfully"
        ))

})

const getAllLocation = asyncHandler(async (req, res) => {

    const location = await LocationAndMedia.find()
        .select('-caption -photos -video')

    console.log("location  : ", location)

    return res.status(200)
        .json(new apiResponse(200, location, "all the location and media"))

})


const getDataById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new apiError(400, "Invalid ID format")
    }


    const data = await LocationAndMedia.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {

            $lookup: {
                from: "users",
                as: "userProfileAndMedia",
                localField: "user",
                foreignField: "_id"
            }

        },
        {
            $unwind: "$userProfileAndMedia"
        },
        {
            $project: {
                name: "$userProfileAndMedia.name",
                avatar: "$userProfileAndMedia.avatar",
                caption: 1,
                photos: 1,
                video: 1,
                uniqueId: 1
            }
        }
    ])


    console.log("data  : ", data)

    return res.status(200)
        .json(new apiResponse(200, data[0], "fetched by the id "))
})

export {
    getLocationAndMEdiaAndCaption,
    getAllLocation,
    getDataById
}