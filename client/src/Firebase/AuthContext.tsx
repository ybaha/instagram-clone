import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";
import type { User, UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail as updateEmailF,
  updatePassword as updatePasswordF,
} from "firebase/auth";
import { set, onValue, ref } from "firebase/database";
import axios from "axios";

type ContextProps = {
  currentUser: User | null | undefined;
  getCurrentUsername: () => string;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (
    email: string,
    password: string,
    username: string,
    real_name: string
  ) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void> | undefined;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
};

const AuthContext = React.createContext<ContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Context Error");
  }
  return context;
};

type Props = { children: any };

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [currentUsername, setCurrentUsername] = useState<undefined | string>(
    undefined
  );

  async function signup(
    email: string,
    password: string,
    username: string,
    real_name: string
  ) {
    let o;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setTimeout(() => {}, 1000);
      if (!auth.currentUser?.uid) {
        console.log("currentuser yok");
        return;
      }

      set(ref(db, "users/" + auth.currentUser?.uid), {
        username: username,
      });
      // console.log(auth.currentUser.uid);
      let res = await axios.post(
        process.env.REACT_APP_SERVER + "api/user/create",
        {
          uid: auth.currentUser?.uid,
          username: username,
          profile_picture: "",
          real_name: real_name,
          website: "",
          bio: "",
          email: email,
          following: [],
          posts: [],
        }
      );
      console.log(res.data);
      var usersRef = ref(db, "users/" + currentUser!.uid);
      onValue(usersRef, (snapshot) => {
        res = snapshot.val();
        console.log(res);
      });
    } catch (e: any) {
      if (e && e.message) o = e;
    } finally {
      return o;
    }
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email: string) {
    if (auth.currentUser) {
      return updateEmailF(auth.currentUser, email);
    }
  }

  function updatePassword(password: string) {
    if (auth.currentUser) {
      return updatePasswordF(auth.currentUser, password);
    }
  }

  function getCurrentUsername() {
    let res: any;

    if (currentUsername) {
      return currentUsername;
    }

    var usersRef = ref(db, "/users/" + currentUser?.uid);
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        res = snapshot.val();
        setCurrentUsername(res?.username);
      }
    });

    return res?.username;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getCurrentUsername,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
