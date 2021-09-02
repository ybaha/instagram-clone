import express, { Request, Response } from "express";
import { PostRouter } from "./post";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

router.get("/api/get", async (req: Request, res: Response) => {
  res.send("/api/todo");
});

router.use(PostRouter);

export { router as router };
