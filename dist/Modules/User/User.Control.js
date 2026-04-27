import express from "express";
import { authentication } from "../../MiddleWares/AuthenticationMiddelWare.js";
import SuccessResponse from "../../Common/Response/SuccessResponse.js";
import UserService from "./User.Service.js";
import { validation } from "../../MiddleWares/ValidationMiddleWare.js";
import { LogOutSchema } from "./User.Validation.js";
const UserRouter = express.Router();
UserRouter.get("/Test", authentication(), (req, res) => {
    return SuccessResponse({ res, Msg: "done", data: req.user });
});
UserRouter.post("/LogOut", authentication(), validation(LogOutSchema), async (req, res) => {
    const result = await UserService.logOut(req.user._id, req.payLoad, req.body.LogOutOption);
    return SuccessResponse({ res, Msg: "done", data: result });
});
export default UserRouter;
