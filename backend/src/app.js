import Express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { routes as index } from "./routes/index";

import { error404Handler, errorHandler } from "./middlewares/error";
import { checkReqMethod } from "./middlewares/checkReq";


const app = Express();


//Middlewares
app.use( helmet() );
app.use(
    cors({
        origin: ['http://localhost:4200'],
        optionsSuccessStatus: 200,
        credentials: true
    })
);
app.use( cookieParser() );
app.use( Express.json() );
app.use( Express.urlencoded({ extended: false }) );
app.use( checkReqMethod );


//Settings
app.set('port', parseInt( process.env.PORT ) || 3000);


//Routes
app.get('/', (req, res) => res.json({ msg: "AUTH backend based on JWT" }));

for (const route of index) {
    app.use('/api/v1', route);
}

app.use(error404Handler);
app.use(errorHandler);


export default app;