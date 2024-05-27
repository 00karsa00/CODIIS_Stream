import mongoose from "mongoose";

const Favourites = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // videos: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Video',
    // }],
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("favourites", Favourites, "favourites");