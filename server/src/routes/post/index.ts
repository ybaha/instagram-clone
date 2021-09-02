import express, { Request, Response } from "express";
import Post, { likesDoc, postDoc } from "../../models/postSchema";
import multer from "multer";
import axios from "axios";
import ApiClient from "imgbb";
const fs = require("fs").promises;

const router = express.Router();

// GET ALL POSTS
router.get("/api/posts", async (req: Request, res: Response) => {
  let allPosts: postDoc[] = await Post.find().sort({ date: "desc" });
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
  let post: any = await Post.find({ _id: data.postId });
  console.log(post);
  console.log(data);
  console.log(post?.likes);

  Post.updateOne(
    { _id: data.postId },
    { $addToSet: { likes: [{ userID: data.userId }] } }
  );

  if (post && post.likes === undefined) {
    // First like
    post.likes = [];
    console.log("first like");
  }

  post.likes.push({
    //@ts-ignore
    userID: data.userId,
  });

  post.save();

  //TODO
});

export { router as PostRouter };
