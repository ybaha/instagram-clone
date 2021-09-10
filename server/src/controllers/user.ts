import { Request, Response } from "express";
import ApiClient from "imgbb";
import { promises } from "fs";
import { uploadPhoto } from "../utils";
import { User, UserDoc } from "../models/userSchema";

const { readFile, writeFile } = promises;

export const createUser = async (req: Request, res: Response) => {
  let data: UserDoc = req.body;
  let file = req.file;
  let date = Date.now();
  let user;
  try {
    if (file) {
      let profilePictureUrl = await uploadPhoto(data.username, file.path, date);
      data.profile_picture = profilePictureUrl;
    }
    user = await User.create(data);
    console.log("Created User");
  } catch (err) {
    console.log(err);
  }

  return user;
};

export const updateUser = async (req: Request, res: Response) => {
  let data: UserDoc = req.body;
  let updateObject: { [key: string]: any } = {};

  if (!data.uid || !data.username) return;

  for (const [key, value] of Object.entries(data)) {
    if (key === "username" || key === "uid") continue;
    updateObject[key] = value;
  }

  try {
    await User.findOneAndUpdate(
      { uid: data.uid },
      { $set: updateObject }
    ).exec();
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (req: Request, res: Response) => {
  let user = await User.findOne({ username: req.params.username });
  res.send(user);
};
