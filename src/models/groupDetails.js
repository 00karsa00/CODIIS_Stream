import mongoose from "mongoose";

const GroupDetails = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    description: String,
    // members: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("groupDetails", GroupDetails, "groupDetails");