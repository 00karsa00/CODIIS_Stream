import mongoose from "mongoose";

const Plans = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        enum: [1, 3, 6, 12], // duration in months
    },
    // videoId: {
    //     type: [String],
    //     default: []
    // },
    isDelete: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("plans", Plans, "plans");