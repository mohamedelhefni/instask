import { Router, Request, Response, NextFunction } from "express";
import { Event } from "../models/event";
import prisma from "../prisma/client";
import { EventsOptions, createEvent, getEvents } from "../services/event.service";
import { eventNames } from "process";
import { getOptions } from "../utils/queryBuilder";

const router = Router();


router.get("/events", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options: EventsOptions = getOptions(req);
        const events = await getEvents(options);
        res.json(events)
    } catch (error) {
        next(error);
    }
});

router.post('/events', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const eventBody = req.body as Event;
        eventBody.location = String(ip);
        const event = await createEvent(eventBody);
        res.json(event)
    } catch (error) {
        next(error);
    }
});


export default router;