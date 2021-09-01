import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

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

class UIStore {
  constructor() {
    makeAutoObservable(this);
  }

  posts: PostProps[] = [];

  setPosts = (posts: PostProps[]) => {
    this.posts = posts;
  };

  showUI = false;

  setShowUI = (b: boolean) => {
    this.showUI = b;
    if (this.showUI) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  };
}

const StoreContext = createContext(new UIStore());

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("Context Error");
  }
  return context;
};
