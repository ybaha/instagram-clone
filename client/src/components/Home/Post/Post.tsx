import React from "react";
import s from "./index.module.scss";
import postImage from "./post.jpg";
import { useHistory } from "react-router-dom";
import { Comment, Direct, Like, LikeFill, Subdir } from "../../icons";
import TimeAgo from "react-timeago";
import axios from "axios";
import { useAuth } from "../../../Firebase/AuthContext";
import { useStore } from "../../../store/UIStore";
import { observer } from "mobx-react-lite";

type Props = {
  id: string;
  userPicture: string;
  username: string;
  image?: string;
  text: string;
  liked: boolean;
  likes: { userID: string }[];
  comments?: CommentProps[];
  date: number;
};

type SubCommentProps = {
  _id: string;
  username: String;
  comment: String;
  date?: number;
  likes?: { userID: string }[];
  user_id: string;
};

type CommentProps = {
  _id: string;
  comment: string;
  subcomment?: SubCommentProps[];
  likes?: { userID: string }[];
  username: string;
  date?: number;
  user_id: String;
};

const Post: React.FC<Props> = ({
  image,
  text,
  username,
  likes,
  date,
  comments,
  userPicture,
  // liked,
  id,
}) => {
  const history = useHistory();
  const { getCurrentUsername, currentUser } = useAuth();
  const { posts, setPosts } = useStore();
  const [liked, setLiked] = React.useState(false);
  const [commentBox, setCommentBox] = React.useState(false);
  const [subCommentBox, setSubCommentBox] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const commentRef: any = React.useRef();

  const currentUsername = getCurrentUsername();

  console.log(comments);

  if (!image?.length) {
    image = postImage;
  }

  const displayComments = () => {
    const map = () => {
      return comments?.map((comment, idx) => (
        <div className={s.commentWrapper}>
          <div
            style={{
              marginBottom: "3px",
              display: "inline",
              maxWidth: "95%",
              wordBreak: "break-word",
            }}
            key={idx}
          >
            <div className={s.bold}>{comment.username}</div>
            {" " + comment.comment}
          </div>
          <div className={s.commentPopup}>
            <Comment
              style={{ width: "12px", cursor: "pointer" }}
              onClick={(e) => sendSubComment(e, comment, "Selan")}
            />
          </div>
          {/* <form
            className={s.subCommentForm}
            onSubmit={(e) => sendSubComment(e, comment)}
          >
            <input type="text"></input>
            <button type="submit">Comment</button>
          </form> */}
          {/* //TODO COK USENDIM */}
        </div>
      ));
    };

    return showComments ? (
      <>
        <div className={s.commentsContainer}>{map()}</div>
        <div
          style={{ color: "#8e8e8e", cursor: "pointer" }}
          onClick={() => setShowComments(!showComments)}
        >
          Yorumlari gizle.
        </div>
      </>
    ) : (
      <div
        style={{ color: "#8e8e8e", cursor: "pointer" }}
        onClick={() => setShowComments(!showComments)}
      >
        Yorumlari gor...
      </div>
    );
  };

  const handleLike = async () => {
    let res = await axios.post(
      process.env.REACT_APP_SERVER + "api/post/like/",
      {
        username: currentUsername,
        userId: currentUser?.uid,
        postId: id,
      }
    );
    let resget = await axios.get(process.env.REACT_APP_SERVER + "api/posts"); // TODO bad
    setPosts(resget.data);
  };

  const sendComment = async (e: any) => {
    e.preventDefault();
    let res = await axios.post(
      process.env.REACT_APP_SERVER + "api/post/comment",
      {
        isSub: false,
        comment: commentRef.current?.value,
        postId: id,
        userId: currentUser?.uid,
        username: currentUsername,
      }
    );
    console.log(res);
  };

  const sendSubComment = async (
    e: any,
    comment: CommentProps,
    text: string
  ) => {
    e.preventDefault();
    let res = await axios.post(
      process.env.REACT_APP_SERVER + "api/post/comment",
      {
        isSub: true,
        comment: text,
        postId: id,
        userId: currentUser?.uid,
        username: currentUsername,
        parentCommentId: comment._id,
      }
    );
    console.log(res);
  };

  React.useEffect(() => {
    if (likes.some((el) => el.userID === currentUser?.uid)) setLiked(true);
    else setLiked(false);
  }, [posts]);

  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <div
          className={userPicture !== "default" ? s.photo : s.photoDefault}
          style={{ marginLeft: "10px" }}
        >
          {userPicture !== "default" ? (
            <img
              className={s.userPic}
              src={userPicture}
              alt={username + " profile picture"}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={s.username}
          onClick={() => history.push("/istekram/" + username)}
        >
          {username}
        </div>
      </div>
      <img
        style={{ width: "100%", maxHeight: "600px", objectFit: "contain" }}
        src={image}
        alt={username + " post picture"}
      ></img>
      <div></div>
      <div className={s.postBtnsSection}>
        <div className={s.postBtns} onClick={handleLike}>
          {liked ? <LikeFill /> : <Like />}
        </div>
        <div className={s.postBtns}>
          <Comment onClick={() => setCommentBox(!commentBox)} />
        </div>
        <div className={s.postBtns}>
          <Direct />
        </div>
      </div>
      <div className={s.postSub}>
        {commentBox && (
          <div className={s.commentBox}>
            <form onSubmit={(e) => sendComment(e)}>
              <input type="text" ref={commentRef}></input>
              <button type="submit">Comment</button>
            </form>
          </div>
        )}
        <div className={s.postLikes}>
          <div className={s.bold} style={{ marginTop: "4px" }}>
            <span>{likes.length} kisi bu gonderiyi begendi</span>
          </div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ marginRight: "6px" }} className={s.bold}>
            {username}
          </span>
          {text}
        </div>
        {!!comments?.length && (
          <div style={{ marginBottom: "8px" }}>{displayComments()}</div>
        )}
        <div style={{ color: "#8e8e8e", fontSize: "12px" }}>
          <TimeAgo date={date} />
        </div>
      </div>
    </div>
  );
};

export default observer(Post);
