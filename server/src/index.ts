import express from "express";
import bodyParser, { json } from "body-parser";
import { PostRouter } from "./routes/post";
import mongoose from "mongoose";
import cors from "cors";
import { pw } from "./pw";
import { UserRouter } from "./routes/user";

export const port = process.env.PORT || 5000;
const app = express();

let mongooseURL =
  "mongodb+srv://baha:" + pw + "@cluster0.x0mow.mongodb.net/istekram";

if (process.env.NODE_ENV === "dev")
  mongooseURL = "mongodb://localhost/istekram";
else console.log = () => {};

console.log(mongooseURL);
console.log(process.env.NODE_ENV);

mongoose.connect(mongooseURL);

app.use(cors());
app.use(json());
app.use(express.json());
app.use(PostRouter);
app.use(UserRouter);
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server is up and runnning!");
});
