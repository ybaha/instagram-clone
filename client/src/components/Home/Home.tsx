import React from "react";
import Rightbar from "./Rightbar/Rightbar";
import Post from "./Post/Post";
import "./Home.css";
import Stories from "./Stories/Stories";
import NavbarTop from "../Navbar/Navbar";
import FirebaseProvider, { useFirebase } from "../../Firebase/FirebaseContext";
import axios from "axios";
import { useWindowSize } from "./Stories/Resize";
import CreatePost from "./Rightbar/CreatePost/CreatePost";

type PostProps = {
  userPicture: string;
  username: string;
  image: string;
  text: string;
  liked: boolean;
  likes: { userID: string }[];
  comments?: [];
  date: number;
  _id: string;
};

const Page: React.FC = () => {
  const [posts, setPosts] = React.useState<[PostProps] | []>([]);
  const [windowWidth] = useWindowSize();

  const fetchPosts = async () => {
    let res = await axios.get(process.env.REACT_APP_SERVER + "api/posts");
    setPosts(res.data);
  };

  React.useEffect(() => {
    fetchPosts();
    let interval = setInterval(() => {
      fetchPosts();
    }, 10 * 1000);
  }, []);

  const displayPosts = () => {
    if (posts.length) {
      posts.reverse();
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
          <div style={{ marginTop: "200px" }}>
            {windowWidth <= 1000 && (
              <CreatePost setPosts={setPosts} style={{ marginTop: "-30px" }} />
            )}
            {displayPosts()}
          </div>
        </div>
        <Rightbar setPosts={setPosts} />
      </div>
    </FirebaseProvider>
  );
};
export default Page;
