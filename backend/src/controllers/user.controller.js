import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { apiError } from "../utlis/apiError.js";
import apiResponse from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import { uploadeCloudinary } from "../utlis/cloudinary.js"
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (id) => {

    try {
        const user = await User.findById(id)

        if (!user) {
            throw new apiError(401, "Inavlid User")
        }

        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });

      
        return { accessToken, refreshToken };


    } catch (error) {

        console.log("Error in generating Access And RefreshTokens", error)
        throw new apiError(401, "error in generating the access and refresh token")
    }

}


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

    const avatar = avatarLocalPath ? await uploadeCloudinary(avatarLocalPath) : null

    const user = await User.create({
        name: name,
        fullname: fullname,
        email: email,
        password: password,
        avatar: avatar.url,
        // uniqueId: String(crypto.randomUUID())
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

const login = asyncHandler(async (req, res) => {
    console.log("body ", req.body)
    const { name, email, password } = req.body

    if (!name || !email) {
        throw new apiError(402, " username and email is requrired")
    }

    if (!password) {
        throw new apiError(402, " password is required")
    }

    const user = await User.findOne({
        $or: [{ name }, { email }]
    }).select("+password")

    if (!user) {
        throw new apiError(401, " Inavlid user ")
    }

    const isValidPassword = await user.isPasswordCorrect(password)

    if (!isValidPassword) {
        throw new apiError(402, "password is incorrect")
    }
    
    

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");



    if (!loggedInUser) {
        throw new apiError(401, "Invalid user")
    }

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200, { user : loggedInUser, refreshToken, accessToken }, "user loggedIn"))

})

const generateRefreshAccessToken = asyncHandler(async (req, res) => {

    console.log("cookies  " , req.cookies)
    console.log("body  " , req.body)
    const incommingToken = req.cookies?.refreshToken || req.body?.refreshToken
      
    console.log("incommingToken  : ",incommingToken)

    if (!incommingToken) {
        throw new apiError(401, "Token not received")
    }

    try {

        const decodedToken = jwt.verify(incommingToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select('-password')

        if (incommingToken !== user?.refreshToken) {
            throw new apiError(401, "Invalid user or the Token mismatched")
        }

        const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(user._id)

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }

        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new apiResponse(200, user, "the token has been regenerated Successfully"))

    } catch (error) {
        console.log("Invalid user or can not generate the token", error.message)
        throw new apiError(401, "Invalid user or can not generate the token" || error.message)
    }
})


export {
    register,
    login,
    generateRefreshAccessToken
}
