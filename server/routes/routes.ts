import { Router } from "express";
import eventController from "../controllers/event.controller";


const api = Router();
api.use(eventController)

export default Router().use("", api)