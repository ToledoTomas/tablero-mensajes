import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", routes);

app.use("*", (req, res) => {
  res.status(404).send("Error 404: Not Found");
});

export default app;
