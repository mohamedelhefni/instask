import { Router, Request, Response, NextFunction } from "express";
import { Event } from "../models/event";
import prisma from "../prisma/client";
import { createEvent, getEvents } from "../services/event.service";
import { eventNames } from "process";

const router = Router();


router.get("/events", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await getEvents("");
        res.json(events)
    } catch (error) {
        next(error);
    }
});

router.post('/events', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventBody = req.body as Event;
        const event = await createEvent(eventBody);
        res.json(event)
    } catch (error) {
        next(error);
    }
});


export default router;