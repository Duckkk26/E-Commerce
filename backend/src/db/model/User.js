import mongoose, { Schema } from "mongoose";

// Create schema for user model
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;