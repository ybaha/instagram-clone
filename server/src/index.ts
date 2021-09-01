import express from "express";
import bodyParser, { json } from "body-parser";
import { router } from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import { pw } from "./pw";

const port = process.env.PORT || 5000;
const app = express();

const mongooseURL =
  process.env.NODE_ENV === "prod"
    ? "mongodb+srv://baha:" + pw + "@cluster0.x0mow.mongodb.net/myFirstDatabase"
    : "mongodb://localhost/istekram";

mongoose.connect(mongooseURL);

app.use(cors());
app.use(json());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("Server is up and runnning!");
});
