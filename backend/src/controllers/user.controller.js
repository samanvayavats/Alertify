import { User } from "../models/user.model.js";
import { apiError } from "../utlis/apiError.js";
import apiResponse from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import { uploadeCloudinary } from "../utlis/cloudinary.js"


const register = asyncHandler(async (req, res) => {

    const { name, fullname, email, password } = req.body

    if (
        [fullname, email, name, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (existedUser) {
        throw new apiError(402, " User existed ")
    }

    console.log("file : ", req.file)
    const avatarLocalPath = req.file.path

    if (!avatarLocalPath) {
        throw new apiError(401, "the path for the avatar is required")
    }

    const avatar =  avatarLocalPath ? await uploadeCloudinary(avatarLocalPath) : null

    const user = await User.create({
        name: name,
        fullname: fullname,
        email: email,
        password: password,
        avatar: avatar.url
    })

    const createdUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user")
    }

     return res.status(201).json(
        new apiResponse(200, createdUser, "User registered Successfully")
    )

})

export {
    register
}
