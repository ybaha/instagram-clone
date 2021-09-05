import { Request, Response } from "express";
import { CommentDoc, Post } from "../models/postSchema";
import ApiClient from "imgbb";
import { promises } from "fs";
import { nanoid } from "nanoid";
import mongoose from "mongoose";

const { readFile } = promises;
let key = "a1e4a333e66c1b8d5163332ba42cd473";

export const createUniquePost = async (req: Request, res: Response) => {
  let body = req.body;
  let file = req.file!;
  let date = Date.now();
  let name = body.username + "_" + date;

  let api = new ApiClient({
    token: key,
  });
  let bbres: any = await api
    .upload({
      name: name,
      image: await readFile(file.path),
    })
    .catch((e) => console.log(e));

  let imageUrl = bbres.data?.image?.url;

  let response: any;
  try {
    response = await Post.create({
      username: body.username,
      user_id: body.user_id,
      text: body.text,
      image: imageUrl,
      date: date,
    });
    console.log("Created new post -> ", response._id);
  } catch (err) {
    console.log(err);
  }
  if (response) return res.send({ success: true });
  else return res.send({ success: false });
};

export const createPost = async (req: Request, res: Response) => {
  let response: any;
  try {
    response = await Post.create(req.body);
  } catch (err) {
    console.log(err);
  }
  if (response) return res.send({ success: true });
  else return res.send({ success: false });
};

type Like = {
  username: string;
  userId: string;
  postId: string;
};

export const likePost = async (req: Request, res: Response) => {
  let data: Like = req.body;
  let post = await Post.findOne({ _id: data.postId }).exec();
  // console.log(post);
  // console.log(data);
  // console.log(post?.likes);

  let isLiked = await Post.findOneAndUpdate(
    {
      $and: [
        { _id: data.postId },
        { likes: { $elemMatch: { userID: data.userId } } },
      ],
    },
    { $pull: { likes: { userID: data.userId } } }
  )
    .exec()
    .catch((e) => {
      console.log(e);
    });

  if (!isLiked) {
    await Post.findOneAndUpdate(
      {
        $and: [
          { _id: data.postId },
          { likes: { $not: { $elemMatch: { userID: data.userId } } } },
        ],
      },
      { $addToSet: { likes: { userID: data.userId } } }
    )
      .exec()
      .catch((e) => {
        console.log(e);
      });
  }
  if (isLiked) return res.send({ liked: false });
  return res.send({ liked: true });
};

type Comments = {
  isSub: boolean;
  parentCommentId: string;
  comment: string;
  postId: string;
  userId: string;
  username: string;
};

export const commentOnPost = async (req: Request, res: Response) => {
  let data: Comments = req.body;
  let post = await Post.findOne({ _id: data.postId }).exec();

  if (!data.userId) return;

  let response;

  if (post && !data.isSub) {
    await Post.findOneAndUpdate(
      { _id: data.postId },
      {
        $push: {
          comments: {
            comment: data.comment,
            comment_id: nanoid(),
            username: data.username,
            user_id: data.userId,
          },
        },
      }
    )
      .exec()
      .catch((e) => {
        console.log(e);
      });
  } else if (post && data.isSub) {
    let parentObjectID = new mongoose.Types.ObjectId(data.parentCommentId);

    let subcomment = {
      comment: data.comment,
      username: data.username,
      user_id: data.userId,
    };

    response = await Post.findOneAndUpdate(
      {
        _id: data.postId,
        "comments._id": parentObjectID,
      },
      { $push: { "comments.$.subcomment": subcomment } }
    ).exec();
  }

  return res.send(response);
};
