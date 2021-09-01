import express, { Request, Response } from "express";
import Post, { likesDoc, postDoc } from "../../models/postSchema";

const router = express.Router();

// GET ALL POSTS
router.get("/api/posts", async (req: Request, res: Response) => {
  let allPosts = await Post.find();
  return res.send(allPosts);
});

// CREATE A POST
router.post("/api/post/create", async (req: Request, res: Response) => {
  let body = req.body;
  let response: any;
  try {
    response = await Post.create(body);
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
  let post: postDoc = await Post.find({ _id: data.postId });
  console.log(post);
  console.log(data);
  //TODO
});

export { router as PostRouter };
