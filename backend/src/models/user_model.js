import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dx48q3i5w/image/upload/v1761331086/9e837528f01cf3f42119c5aeeed1b336_uuguni.jpg",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    about:{
        type: String,
        default: "Hey there! I am using ConnectO App."
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,   
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   
            select: false,
        }
    ],
    friendRequestReceive: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   
            select: false,
        }
    ],
    friendRequestSend: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   
            select: false,
        }
    ],
    securityToken:{
        token:{
            type: String,
            default: null,
            select: false
        },
        tokenExpiry:{
            type: String,
            default: null,
            select: false
        }
    },
    emailCode:{
        code:{
            type: String,
            default: null,
            select: false
        },
        codeExpiry:{
            type: String,
            default: null,
            select: false
        }
    }
}, {timestamps: true});

export const userModel = mongoose.model("User", userSchema)

