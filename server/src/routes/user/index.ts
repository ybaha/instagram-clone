import express, { Request, Response } from "express";
import { createUser } from "../../controllers/user";
import { u } from "../../utils";

const router = express.Router();

router.post("/api/user/create", u.single("image"), createUser);

export { router as PostRouter };
