import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null,
    },
    isActivePlan: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user', 
    },
    purchasesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchases',
    }
}, { timestamps: true })

export default mongoose.model('users', userSchema)