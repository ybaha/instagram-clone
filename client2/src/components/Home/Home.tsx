import React from "react";
import Rightbar from "./Rightbar/Rightbar";
import Post from "./Post/Post";
import "./Home.css";
import Stories from "./Stories/Stories";
import FirebaseProvider, { useFirebase } from "../../Firebase/FirebaseContext";
import axios from "axios";
import { useWindowSize } from "./Stories/Resize";
import CreatePost from "./Rightbar/CreatePost/CreatePost";
import { useStore } from "../../store/UIStore";
import { observer } from "mobx-react-lite";
import { useInterval } from "../../utils/useInterval";
import { useAuth } from "../../Firebase/AuthContext";

const Page: React.FC = () => {
  const { posts, setPosts, showUI } = useStore();

  const fetchPosts = async () => {
    let res = await axios.get(process.env.REACT_APP_SERVER + "api/posts");
    setPosts(res.data);
  };

  useInterval(() => {
    if (!showUI) fetchPosts();
  }, 6000);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const displayPosts = () => {
    if (posts.length) {
      return posts.map((post, idx) => (
        <Post
          username={post.username}
          userPicture={post.userPicture}
          image={post.image}
          date={post.date}
          likes={post.likes}
          liked={post.liked}
          text={post.text}
          comments={post.comments}
          id={post._id}
          key={idx}
        />
      ));
    } else {
      return (
        <div style={{ textAlign: "center", color: "#333333" }}>
          <h2 style={{ fontWeight: 500 }}>
            There are no posts to see on your feed
          </h2>
          <h3 style={{ fontWeight: 500 }}>Start following people!</h3>
        </div>
      );
    }
  };

  return (
    <FirebaseProvider>
      <div className="Page">
        <div className="Leftbar">
          <Stories />
          <div style={{ marginTop: "200px", paddingBottom: "100px" }}>
            <CreatePost style={{ marginTop: "-30px" }} mobile={true} />
            {displayPosts()}
          </div>
        </div>
        <Rightbar />
      </div>
    </FirebaseProvider>
  );
};
export default observer(Page);
