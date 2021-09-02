import mongoose from "mongoose";

const getDate = () => {
  let date = new Date();
  return date.getTime();
};
export interface CommentDoc extends mongoose.Document {
  comment: String;
  comment_id: String;
  subcomment?: SubCommentDoc[];
  likes?: LikesDoc[];
  username: String;
  date?: number;
  user_id: String;
}

export interface SubCommentDoc extends mongoose.Document {
  username: String;
  comment: String;
  date?: number;
  likes?: LikesDoc[];
  user_id: String;
}

export interface LikesDoc extends mongoose.Document {
  userID: String;
}

export interface PostDoc extends mongoose.Document {
  comments: CommentDoc[];
  date: number;
  image: string;
  likes: LikesDoc[];
  liked: boolean;
  text: string;
  userPicture: string;
  username: string;
}

const likesSchema = new mongoose.Schema<LikesDoc>({
  userID: String,
});

const subCommentsSchema = new mongoose.Schema<SubCommentDoc>({
  comment: String,
  date: { type: Number, default: getDate },
  likes: { type: [likesSchema], default: [] },
  username: String,
  user_id: String,
});

const commentsSchema = new mongoose.Schema<CommentDoc>({
  comment: String,
  comment_id: String,
  subcomment: { type: [subCommentsSchema], default: [] },
  likes: { type: [likesSchema], default: [] },
  username: String,
  date: { type: Number, default: getDate, required: false },
  user_id: String,
});

const postSchema = new mongoose.Schema<PostDoc>({
  comments: { type: [commentsSchema], default: [] },
  date: { type: Number, default: getDate },
  image: String,
  likes: { type: [likesSchema], default: [] },
  liked: { type: Boolean, default: false },
  text: String,
  userPicture: { type: String, default: "default" },
  username: String,
});

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentsSchema);

export { Post, Comment };
