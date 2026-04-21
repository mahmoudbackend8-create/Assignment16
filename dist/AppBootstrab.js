import express from "express";
import AuthRouter from "./Modules/Auth/AuthController.js";
import GlobalErrHandling from "./MiddleWares/GlobalErrHandling.js";
import { Server_PORT } from "./Config/Config.service.js";
import TestDBConnection from "./DB/DB.Connection.js";
import { TestConnectionRedis } from "./DB/Redis/Redis.Connection.js";
async function AppBoostrab() {
    const PORT = Server_PORT;
    const App = express();
    App.use(express.json());
    await TestDBConnection();
    await TestConnectionRedis();
    App.use("/Auth", AuthRouter);
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
