import express, { Express, Request, Response } from 'express';
import { EventRequest } from "./types/EventRequest";
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app: Express = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.get('/events', async (req: Request, res: Response) => {
    const events = await prisma.event.findMany({
        include: { action: true, actor: true, target: true }
    })
    res.json(events)
});

app.post('/events', async (req: Request, res: Response) => {
    console.log(req.body)
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

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});