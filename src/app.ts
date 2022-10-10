import cors from "cors";
import express from "express";
import "express-async-errors";
import route from "./routes/routesIndex";
import errorHandler from "./middlewares/errorHandler";
import e2eRouter from "./routes/e2eRouter";
const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

if (process.env.NODE_ENV === "test") {
  app.use(e2eRouter);
}

app.use(errorHandler);
export default app;
