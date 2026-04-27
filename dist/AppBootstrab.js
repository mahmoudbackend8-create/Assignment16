import express from "express";
import AuthRouter from "./Modules/Auth/AuthController.js";
import GlobalErrHandling from "./MiddleWares/GlobalErrHandling.js";
import { Server_PORT } from "./Config/Config.service.js";
import TestDBConnection from "./DB/DB.Connection.js";
import { TestConnectionRedis } from "./DB/Redis/Redis.Connection.js";
import UserRouter from "./Modules/User/User.Control.js";
import cors from "cors";
import UserModel from "./DB/Models/UserModel.js";
async function AppBoostrab() {
    const PORT = Server_PORT;
    const App = express();
    App.use(express.json(), cors());
    await TestDBConnection();
    await TestConnectionRedis();
    const user = await UserModel.create({
        UserName: "Mahmoud Emaira",
        Email: "m.emaira@yahoo.com",
        Password: "Mahmoud Emaira",
        Gender: 1,
        Phone: "01117957825",
    });
    user.UserName = "Updated";
    user.save();
    App.use("/Auth", AuthRouter);
    App.use("/User", UserRouter);
    App.get("/", (req, res, next) => {
        res.status(200).send("Landing Page");
    });
    App.get("/*dummy", (req, res, next) => {
        res.status(404).json({ Msg: "Invalid Url Or Method" });
    });
    App.use(GlobalErrHandling);
    App.listen(3000, () => {
        console.log("port is runing on prot 3000");
    });
}
export default AppBoostrab;
