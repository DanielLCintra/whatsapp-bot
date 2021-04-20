import { Router } from "express";
import FileCatcherBot from "../controllers/FileCatcherBot";

const botRouter = Router();

botRouter.post("/arquivo", FileCatcherBot.catchFile);

export default botRouter;
