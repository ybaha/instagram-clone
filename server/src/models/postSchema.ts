import mongoose from "mongoose";
import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const getDate = () => {
  let date = new Date();
  return date.getTime();
};

const likesSchema = createSchema({
  user_id: Type.string({ required: true }),
});

const subCommentsSchema = createSchema({
  comment: Type.string({ required: true }),
  date: Type.number({ default: getDate, required: true }),
  likes: Type.array().of(likesSchema),
  username: Type.string({ required: true }),
  user_id: Type.string({ required: true }),
});

const commentsSchema = createSchema({
  comment: Type.string({ required: true }),
  comment_id: Type.string({ required: true }),
  subcomment: Type.array().of(subCommentsSchema),
  likes: Type.array().of(likesSchema),
  username: Type.string({ required: true }),
  date: Type.number({ default: getDate, required: true }),
  user_id: Type.string({ required: true }),
});

const postSchema = createSchema({
  comments: Type.array().of(commentsSchema),
  date: Type.number({ default: getDate, required: true }),
  image: Type.string({ required: true }),
  likes: Type.array().of(likesSchema),
  liked: Type.boolean(),
  text: Type.string(),
  userPicture: Type.string({ default: "default" }),
  username: Type.string({ required: true }),
  user_id: Type.string({ required: true }),
});

export const Post = typedModel("Post", postSchema);
export type PostDoc = ExtractDoc<typeof postSchema>;
export type CommentDoc = ExtractDoc<typeof commentsSchema>;

// export const Comment = mongoose.model("Comment", commentsSchema);
