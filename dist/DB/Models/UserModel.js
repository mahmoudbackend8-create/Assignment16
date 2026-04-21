import mongoose, {} from "mongoose";
import { UserGender, UserProvider, UserRole, } from "../../Common/Enums/User.Enums.js";
const UserSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    Password: {
        type: String,
        required: function () {
            return this.Provider == UserProvider.System;
        },
    },
    Email: { type: String, required: true },
    Gender: { type: Number, enum: UserGender, default: UserGender.Male },
    Phone: String,
    Age: Number,
    Provider: { type: Number, enum: UserProvider, default: UserProvider.System },
    Role: {
        type: Number,
        required: true,
        enum: UserRole,
        default: UserRole.User,
    },
    ProfilePic: String,
    CoverPics: [String],
    ChangeCreditTime: Boolean,
    ConfirmEmail: Date,
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
