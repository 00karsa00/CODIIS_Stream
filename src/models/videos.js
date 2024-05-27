import mongoose from "mongoose";

const Videos = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    fileName:  {
        type: String,
        required: true,
    },
    isDelete: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("videos", Videos, "videos");