import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadeCloudinary = async (fileUrl) => {
    try {
        if (!fileUrl) return null;

        // Uploading the file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(fileUrl, {
            resource_type: "auto"
        });

        // Deleting the file from local storage
        fs.unlinkSync(fileUrl);

        return uploadResult;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Remove the locally saved temporary file if the upload operation fails
        if (fs.existsSync(fileUrl)) {
            fs.unlinkSync(fileUrl);
        }

        return null;
    }
};

const deleteFromCloudinary = async (publicId , type) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: type ,
    });
    console.log("Cloudinary delete result:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error;
  }
};

export { uploadeCloudinary  , deleteFromCloudinary};