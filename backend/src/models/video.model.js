import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videoFile: 
        {
            type: String,
            required: true
        }
    
}, { timestamps: true })

export const Video = mongoose.model("Video" , videoSchema) 