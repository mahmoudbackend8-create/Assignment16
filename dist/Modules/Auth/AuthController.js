import express, {} from "express";
import AuthService from "./Auth.Service.js";
import SuccessResponse from "../../Common/Response/SuccessResponse.js";
import Z from "zod";
import { BadRequestExeption } from "../../Common/Exeptions/DomainExeption.js";
import { LoginSchema, SignUpSchema } from "./Auth.validation.js";
import { validation } from "../../MiddleWares/ValidationMiddleWare.js";
const AuthRouter = express.Router();
AuthRouter.get("/", (req, res) => {
    return SuccessResponse({ res, Msg: "Auth Page" });
});
AuthRouter.post("/SignUp", validation(SignUpSchema), async (req, res) => {
    const result = await AuthService.SignUp(req.body);
    return SuccessResponse({ res, Msg: "SignUp", data: result });
});
AuthRouter.post("/LogIn", validation(LoginSchema), async (req, res) => {
    const result = await AuthService.Login(req.body);
    return SuccessResponse({
        res,
        data: result,
    });
});
export default AuthRouter;
