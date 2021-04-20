import { Router } from "express";
import SearchBot from "../controllers/SearchBot";

const botRouter = Router();

botRouter.post("/search", SearchBot.googleSearch);

export default botRouter;
