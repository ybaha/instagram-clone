import express from "express";
import bodyParser, { json } from "body-parser";
import { router } from "./routes";
import mongoose from "mongoose";
import cors from "cors";

const port = 5000;
const app = express();

mongoose.connect("mongodb://localhost/istekram");

app.use(cors());
app.use(json());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("Server is up and runnning!");
});
