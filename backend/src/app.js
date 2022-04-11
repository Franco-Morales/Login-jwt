import Express from "express";
import Cors from "cors";
import helmet from "helmet";

import { routes as index } from "./routes/index";
import { error404Handler, errorHandler } from "./middlewares/error";


const app = Express();


//Middlewares
app.use(Cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}));
app.use(helmet());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));


//Settings
app.set('port', parseInt(process.env.PORT) || 3000);


//Routes
app.get('/', (req, res) => res.json({ msg: "AUTH backend based on JWT" }));

for (const route of index) {
    app.use('/api/v1', route);
}

app.use(error404Handler);
app.use(errorHandler);


export default app;