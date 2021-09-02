import express, { Request, Response } from "express";
import {
  CommentDoc,
  LikesDoc,
  PostDoc,
  Post,
  Comment,
  SubCommentDoc,
} from "../../models/postSchema";
import multer from "multer";
import axios from "axios";
import ApiClient from "imgbb";
import { nanoid } from "nanoid";

const fs = require("fs").promises;

const router = express.Router();

// GET ALL POSTS
router.get("/api/posts", async (req: Request, res: Response) => {
  let allPosts: PostDoc[] = await Post.find().sort({ date: "desc" });
  return res.send(allPosts);
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/temp");
  },
  filename: function (req, file, cb) {
    let name = file?.originalname;
    cb(null, name);
  },
});

var upload = multer({ storage: storage });
let key = "a1e4a333e66c1b8d5163332ba42cd473";

// CREATE A POST
router.post(
  "/api/post/create/customimg",
  upload.single("image"),
  async (req: Request, res: Response) => {
    let body = req.body;
    let file = req.file!;
    console.log(body);
    console.log(file);

    let image = await fs.readFile(file.path, { encoding: "base64" });

    let date = Date.now();

    let name = body.username + "_" + date;

    let api = new ApiClient({
      token: key,
    });

    let bbres: any = await api
      .upload({
        name: name,
        image: await fs.readFile(file.path),
      })
      .catch((e) => console.log(e));

    let imageUrl = bbres.data?.image?.url;

    console.log(imageUrl);

    let response: any;
    try {
      response = await Post.create({
        username: body.username,
        text: body.text,
        image: imageUrl,
        date: date,
      });
    } catch (err) {
      console.log(err);
    }
    if (response) return res.send({ success: true });
    else return res.send({ success: false });
  }
);

router.post("/api/post/create/", async (req: Request, res: Response) => {
  let response: any;
  // console.log(req.body);
  try {
    response = await Post.create(req.body);
  } catch (err) {
    console.log(err);
  }
  if (response) return res.send({ success: true });
  else return res.send({ success: false });
});

type Like = {
  username: string;
  userId: string;
  postId: string;
};

router.post("/api/post/like", async (req: Request, res: Response) => {
  let data: Like = req.body;
  let post: PostDoc = await Post.findOne({ _id: data.postId }).exec();
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
});

type Comments = {
  isSub: boolean;
  parentCommentId: string;
  comment: string;
  postId: string;
  userId: string;
  username: string;
};

router.post("/api/post/comment", async (req: Request, res: Response) => {
  let data: Comments = req.body;
  let post: PostDoc = await Post.findOne({ _id: data.postId }).exec();

  if (!data.userId) return;

  // console.log(data);

  if (post && !data.isSub) {
    console.log("1");

    await Post.findOneAndUpdate(
      {
        _id: data.postId,
      },
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
    console.log("2");

    let post: PostDoc = await Post.findOne({
      _id: data.postId,
    });

    let comment = post.comments.find(
      (e) => e._id.toString() === data.parentCommentId
    );

    //@ts-ignore
    let subcomment: SubCommentDoc = {
      comment: data.comment,
      username: data.username,
      user_id: data.userId,
    };

    comment?.subcomment?.push(subcomment);

    post.save();

    console.log(comment);
  }

  //TODO
  return res.send("OK");
});

export { router as PostRouter };
