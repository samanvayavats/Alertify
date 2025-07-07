import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    caption : {
        type : String,
        required : true
    },
    photoFile: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true })

export const Photo = mongoose.model("Photo" , photoSchema) 