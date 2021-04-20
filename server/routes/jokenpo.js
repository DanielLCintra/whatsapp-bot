import { Router } from "express";
import JokenPoBot from "../controllers/JokenPoBot";

const botRouter = Router();

botRouter.post("/jogar", JokenPoBot.play);

export default botRouter;
