import { User } from "../models/user.model.js";
import { apiError } from "../utlis/apiError.js";
import asyncHandler from "../utlis/asynHandler.js";
import jwt from 'jsonwebtoken';
// const { jwt } = pkg;

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  
      // console.log("Token received:", token);
  
      if (!token) {
        throw new apiError(403, "Unauthorized request: No token provided");
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // console.log("Decoded token:", decodedToken);
  
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
  
      // console.log("User found:", user);

      if (!user) {
        throw new apiError(400, "Invalid user trying to access");
      }
  
      req.user = user;
      // console.log(" lets see:" ,req.user)
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      throw new apiError(401, "Invalid or expired access token");
    }
  });
  
  