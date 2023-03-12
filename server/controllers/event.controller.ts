import { Router, Request, Response, NextFunction } from "express";
import { EventRequest } from "../types/EventRequest";
import prisma from "../prisma/client";

const router = Router();


router.get("/events", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await prisma.event.findMany({
            include: { action: true, actor: true, target: true }
        })
        res.json(events)
    } catch (error) {
        next(error);
    }
});

router.post('/events', async (req: Request, res: Response) => {
    const {
        object,
        actor,
        group,
        action,
        target,
        location,
        occurred_at,
        metadata
    }: EventRequest = req.body
    const event = await prisma.event.create({
        data: {
            object: object,
            actor: {
                connectOrCreate: {
                    create: {
                        name: actor.name
                    },
                    where: {
                        id: actor.id
                    }
                }
            },
            group: group,
            action: {
                connectOrCreate: {
                    create: {
                        object: action.object,
                        name: action.name
                    },
                    where: {
                        id: action.id
                    }
                }
            },
            target: {
                connectOrCreate: {
                    create: {
                        name: target.name
                    },
                    where: {
                        id: target.id
                    }
                }
            },
            location: location,
            occurred_at: occurred_at,
            metadata: metadata
        }
    })
    res.json(event)
});


export default router;