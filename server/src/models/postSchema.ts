import mongoose from "mongoose";

export interface postCommentsDoc extends mongoose.Document {
  comment: String;
  likes: likesDoc[];
  username: String;
}

export interface likesDoc extends mongoose.Document {
  userID: String;
}

export interface postDoc extends mongoose.Document {
  comments: postCommentsDoc[];
  date: number;
  image: string;
  likes: likesDoc[];
  liked: boolean;
  text: string;
  userPicture: string;
  username: String;
}

const likesSchema = new mongoose.Schema<likesDoc>({
  userID: String,
});

const postCommentsSchema = new mongoose.Schema<postCommentsDoc>({
  comment: String,
  likes: { type: [likesSchema] },
  username: String,
});

const getDate = () => {
  let date = new Date();
  return date.getTime();
};

const postSchema = new mongoose.Schema<postDoc>({
  comments: { type: [postCommentsSchema], default: [] },
  date: { type: Number, default: getDate },
  image: String,
  likes: { type: [likesSchema] },
  liked: { type: Boolean, default: false },
  text: String,
  userPicture: { type: String, default: "default" },
  username: String,
});

const model = mongoose.model("Post", postSchema);

export default model;
