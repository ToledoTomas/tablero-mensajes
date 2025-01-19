import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.render("index");
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    res.render("index", data);
  } catch (error) {
    res.render("index");
  }
});

app.get("/protected", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send("No tienes permiso para acceder a esta página");
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    res.render("protected", data);
  } catch (error) {
    res.status(401).send("No tienes permiso para acceder a esta página");
  }
});

app.use("/", routes);

app.use("*", (req, res) => {
  res.status(404).send("Error 404: Not Found");
});

export default app;
