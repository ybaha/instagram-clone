import { Request, Response } from "express";
import ApiClient from "imgbb";
import { promises } from "fs";
import { nanoid } from "nanoid";
import { User } from "../models/userSchema";

const { readFile, writeFile } = promises;

export const createUser = async (req: Request, res: Response) => {
  try {
    // await User.create({})
  } catch {}
  return "";
};
