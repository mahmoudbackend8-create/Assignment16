import mongoose, { type HydratedDocument } from "mongoose";
import {
  UserGender,
  UserProvider,
  UserRole,
} from "../../Common/Enums/User.Enums.js";

export interface IUser {
  UserName: string;
  Password: string;
  Email: string;
  Gender: UserGender;
  Phone: string;
  Age: number;
  Provider: UserProvider;
  Role: UserRole;
  ProfilePic: string;
  CoverPics: string[];
  ChangeCreditTime: boolean;
  ConfirmEmail: Date;
}

export type IHUser = HydratedDocument<IUser>;

const UserSchema = new mongoose.Schema<IUser>({
  UserName: { type: String, required: true },
  Password: {
    type: String,
    required: function (): boolean {
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
