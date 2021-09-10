import express, { Request, Response } from "express";
import { createUser, updateUser, getUser } from "../../controllers/user";
import { u } from "../../utils";

const router = express.Router();

router.post("/api/user/create", u.single("image"), createUser);

router.post("/api/user/update", updateUser);

router.get("/api/user/get/:username", getUser);

export { router as UserRouter };
