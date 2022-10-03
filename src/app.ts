import cors from "cors";
import express from "express";
import route from "./routes/routesIndex";
import errorHandler from "./middlewares/errorHandler";
const app = express();

app.use(cors());
app.use(express.json());
app.use(route);
app.use(errorHandler);
export default app;
