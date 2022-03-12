import React, { useContext, useState, useEffect } from "react";
import { getDatabase, set, ref } from "firebase/database";

type ContextProps = {
  getPosts: () => void;
  setPosts: () => void;
};

const FirebaseContext = React.createContext<ContextProps | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("need context");
  }
  return context;
};

const FirebaseProvider: React.FC<{ children: any }> = ({ children }) => {
  const db = getDatabase();

  function getPosts() {
    // let dbRef = firebase.database().ref();
    // dbRef.on("value", (data) => {
    //   console.log(data.val());
    // });
  }

  function setPosts() {
    // let dbRef = firebase.database().ref();
    // var newPostRef = dbRef.push();
    // newPostRef.set({});
  }

  const value = {
    getPosts,
    setPosts,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
