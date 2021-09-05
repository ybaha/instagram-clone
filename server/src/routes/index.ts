import express from "express";
import { PostRouter } from "./post";

const router = express.Router();

router.use(PostRouter);

export { router as router };
