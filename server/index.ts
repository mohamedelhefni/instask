import express, { Express, Request, Response, NextFunction } from 'express';
import { Event } from "./models/event";
import HttpException from "./models/HttpException"
import routes from "./routes/routes";
import dotenv from 'dotenv';
const cors = require("cors")

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))
app.use(routes);

// error hanlding middleware
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (err && err.errorCode) {
        // @ts-ignore
        res.status(err.errorCode).json({ code: err.errCode, message: err.message });
    } else if (err) {
        console.log(err)
        res.status(500).json({ code: 500, message: "something went wrong" });
    }
});




app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});