import express, { Express, Request, Response, NextFunction } from 'express';
import { EventRequest } from "./types/EventRequest";
import HttpException from "./types/HttpException"
import routes from "./routes/routes";
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(routes);

// error hanlding middleware
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (err && err.errorCode) {
        // @ts-ignore
        res.status(err.errorCode).json(err.message);
    } else if (err) {
        res.status(500).json(err.message);
    }
});




app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});