import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

type PostProps = {
  userPicture: string;
  username: string;
  image: string;
  text: string;
  liked: boolean;
  likes: { user_id: string }[];
  comments?: [];
  date: number;
  _id: string;
};

type UserProps = {
  _id: string;
  uid: string;
  username: string;
  profile_picture: string;
  real_name: string;
  website: string;
  bio: string;
  email: string;
  following: [];
  posts: [];
};

class UIStore {
  constructor() {
    makeAutoObservable(this);
  }

  currentUserData = {} as UserProps;

  setCurrentUserData = (data: UserProps) => {
    this.currentUserData = data;
  };

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
