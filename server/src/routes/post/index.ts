import express, { Request, Response } from "express";
import { Post } from "../../models/postSchema";
import multer from "multer";
import {
  commentOnPost,
  createPost,
  createUniquePost,
  likePost,
} from "../../controllers/post";
import { u } from "../../utils";

const router = express.Router();

// GET ALL POSTS
router.get("/api/posts", async (req: Request, res: Response) => {
  let allPosts = await Post.find().sort({ date: "desc" });
  return res.send(allPosts);
});

// CREATE A POST
router.post("/api/post/create/customimg", u.single("image"), createUniquePost);
router.post("/api/post/create/", createPost);

// LIKE POST
router.post("/api/post/like", likePost);

// COMMENT ON POST
router.post("/api/post/comment", commentOnPost);

export { router as PostRouter };
