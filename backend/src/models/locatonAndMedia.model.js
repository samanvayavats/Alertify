import mongoose from 'mongoose';

const locationAndMediaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    photos: [{
        type: String,
        required: true
    }],
    video: {
        type: String,
        required: true
    },
    uniqueId:{
        type : String,
        required : true
    }
}, {
    timestamps: true
});

export const LocationAndMedia = mongoose.model('LocationAndMedia', locationAndMediaSchema);
