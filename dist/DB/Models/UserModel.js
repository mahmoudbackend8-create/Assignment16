import mongoose, {} from "mongoose";
import { UserGender, UserProvider, UserRole, } from "../../Common/Enums/User.Enums.js";
import { Hashing } from "../../Common/Security/Hashing.js";
import { bcrypting } from "../../Common/Security/Bcrypting.js";
import _EmailService from "../../Common/Email/Email.Service.js";
import { EmailTypeEnum } from "../../Common/Enums/EmailEnums.js";
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
    Provider: {
        type: Number,
        enum: UserProvider,
        default: UserProvider.System,
    },
    Role: {
        type: Number,
        required: true,
        enum: UserRole,
        default: UserRole.User,
    },
    ProfilePic: String,
    CoverPics: [String],
    ChangeCreditTime: Date,
    ConfirmEmail: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", async function () {
    if (this.isModified("Password")) {
        this.Password = await Hashing({ PlainText: this.Password });
    }
    if (this.Phone && this.isModified("Phone")) {
        this.Phone = bcrypting({ Value: this.Phone });
    }
    console.log("pre");
    this.wasNew = this.isNew;
});
UserSchema.post("save", async function () {
    console.log("post");
    try {
        if (this.wasNew) {
            await _EmailService.SendEmailOTP({
                Email: this.Email,
                emailType: EmailTypeEnum.ConfirmEmail,
                subject: "LogIn OTP",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
