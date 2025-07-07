import { User } from "../models/user.model.js";
import { apiError } from "../utlis/apiError.js";
import asyncHandler from "../utlis/asyncHandler.js";
import jwt from 'jsonwebtoken';
// const { jwt } = pkg;

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token received:", token);

    if (!token) {
      throw new apiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new apiError(401, "Invalid user trying to access");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn("Access token expired");
      throw new apiError(401, "Access token expired");
    }

    console.error("JWT verification error:", error.message);
    throw new apiError(401, error?.message || "JWT verification failed");
  }
});
