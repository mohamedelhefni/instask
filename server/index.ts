import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'


dotenv.config();
const prisma = new PrismaClient()
const app: Express = express();
const port = process.env.PORT || 8000;

app.get('/events', (req: Request, res: Response) => {
    const events = prisma.event.findMany({
        include: { action: true, actor: true, target: true }
    })
    res.json(events)
});



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});