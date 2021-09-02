import mongoose from "mongoose";

export interface PostCommentsDoc extends mongoose.Document {
  comment: String;
  likes: LikesDoc[];
  username: String;
}

export interface LikesDoc extends mongoose.Document {
  userID: String;
}

export interface PostDoc extends mongoose.Document {
  comments: PostCommentsDoc[];
  date: number;
  image: string;
  likes: LikesDoc[];
  liked: boolean;
  text: string;
  userPicture: string;
  username: String;
}

const likesSchema = new mongoose.Schema<LikesDoc>({
  userID: String,
});

const postCommentsSchema = new mongoose.Schema<PostCommentsDoc>({
  comment: String,
  likes: { type: [likesSchema] },
  username: String,
});

const getDate = () => {
  let date = new Date();
  return date.getTime();
};

const postSchema = new mongoose.Schema<PostDoc>({
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
