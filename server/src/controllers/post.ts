import { Request, Response } from "express";
import { CommentDoc, Post } from "../models/postSchema";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { uploadPhoto } from "../utils";
import { User } from "../models/userSchema";

export const createUniquePost = async (req: Request, res: Response) => {
  let body = req.body;
  let file = req.file!;
  let date = Date.now();

  let imageUrl = await uploadPhoto(body.username, file.path, date);

  let response: any;
  try {
    response = await Post.create({
      username: body.username,
      user_id: body.user_id,
      text: body.text,
      image: imageUrl,
      date: date,
    });
    console.log(response);

    console.log(response._id);
    await User.findOneAndUpdate(
      {
        uid: body.uid,
      },
      { $addToSet: { posts: { post_id: response._id } } }
    ).exec();

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
  user_id: string;
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
        { likes: { $elemMatch: { user_id: data.user_id } } },
      ],
    },
    { $pull: { likes: { user_id: data.user_id } } }
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
          { likes: { $not: { $elemMatch: { v: data.user_id } } } },
        ],
      },
      { $addToSet: { likes: { user_id: data.user_id } } }
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
  user_id: string;
  username: string;
};

export const commentOnPost = async (req: Request, res: Response) => {
  let data: Comments = req.body;
  let post = await Post.findOne({ _id: data.postId }).exec();

  if (!data.user_id) return;

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
            user_id: data.user_id,
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
      user_id: data.user_id,
    };

    console.log(subcomment)

    response = await Post.findOneAndUpdate(
      {
        _id: data.postId,
        "comments._id": parentObjectID,
      },
      { $push: { "comments.$.subcomment": subcomment } }
    )
      .exec()
      .catch((e) => {
        console.log(e);
      });
  }

  return res.send(response);
};
