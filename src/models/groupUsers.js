import mongoose from "mongoose";

const GroupUsers = new mongoose.Schema({
    groupId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model("groupUsers", GroupUsers, "groupUsers");