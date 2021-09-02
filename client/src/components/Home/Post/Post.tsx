import React from "react";
import styles from "./index.module.scss";
import postImage from "./post.jpg";
import { useHistory } from "react-router-dom";
import { Comment, Direct, Like, LikeFill } from "../../icons";
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

type CommentProps = {
  username: string;
  comment: string;
  likes: number;
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

  if (!image?.length) {
    image = postImage;
  }

  const showComments = () => {
    comments?.map((comment) => (
      <div className={styles.comment}>{comment.comment}</div>
    ));
  };

  const handleLike = async () => {
    let res = await axios.post(
      process.env.REACT_APP_SERVER + "api/post/like/",
      {
        username: getCurrentUsername(),
        userId: currentUser?.uid,
        postId: id,
      }
    );
    let resget = await axios.get(process.env.REACT_APP_SERVER + "api/posts"); // TODO bad
    setPosts(resget.data);
  };

  React.useEffect(() => {
    if (likes.some((el) => el.userID === currentUser?.uid)) setLiked(true);
    else setLiked(false);
  }, [posts]);

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div
          className={
            userPicture !== "default" ? styles.photo : styles.photoDefault
          }
          style={{ marginLeft: "10px" }}
        >
          {userPicture !== "default" ? (
            <img
              className={styles.userPic}
              src={userPicture}
              alt={username + " profile picture"}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={styles.username}
          onClick={() => history.push("/istekram/" + username)}
        >
          {username}
        </div>
        <div></div>
      </div>
      <img
        style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
        src={image}
        alt={username + " post picture"}
      ></img>
      <div></div>
      <div className={styles.postBtnsSection}>
        <div className={styles.postBtns} onClick={handleLike}>
          {liked ? <LikeFill /> : <Like />}
        </div>
        <div className={styles.postBtns}>
          <Comment />
        </div>
        <div className={styles.postBtns}>
          <Direct />
        </div>
      </div>
      <div className={styles.postSub}>
        <div className={styles.postLikes}>
          <div className={styles.bold} style={{ marginTop: "4px" }}>
            <span>{likes.length} kisi bu gonderiyi begendi</span>
          </div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ marginRight: "6px" }} className={styles.bold}>
            {username}
          </span>
          {text}
        </div>
        {comments?.length ? (
          <div
            style={{ color: "#8e8e8e", marginBottom: "8px" }}
            onClick={showComments}
          >
            Yorumlari gor...
          </div>
        ) : (
          ""
        )}
        <div style={{ color: "#8e8e8e", fontSize: "12px" }}>
          <TimeAgo date={date} />
        </div>
      </div>
    </div>
  );
};

export default observer(Post);
