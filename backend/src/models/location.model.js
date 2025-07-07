import mongoose, { Schema } from "mongoose";

const locationSchema = new mongoose.Schema({
    lat:
        { type: String, required: true },

    lng:
        { type: String, required: true },

    owner:
        { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

export const Location = mongoose.model("Location" , locationSchema)