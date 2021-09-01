import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import firebase from "firebase/app";

type ContextProps = {
  currentUser: firebase.User | null | undefined;
  getCurrentUsername: () => string;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signup: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
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
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();
  const [loading, setLoading] = useState(true);
  const [currentUsername, setCurrentUsername] = useState<undefined | string>(
    undefined
  );

  async function signup(email: string, password: string, username: string) {
    let o = { message: "" };
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      !currentUser?.uid && console.log(`current user yok`);
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser?.uid)
        .set({
          username: username,
        });
      let res;
      var usersRef = firebase.database().ref("users/" + currentUser!.uid);
      usersRef.on("value", (snapshot) => {
        res = snapshot.val();
        console.log(res);
      });
    } catch (e) {
      o = e;
    } finally {
      return o;
    }
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    return currentUser!.updateEmail(email);
  }

  function updatePassword(password: string) {
    return currentUser!.updatePassword(password);
  }

  function getCurrentUsername() {
    let res: any;

    if (currentUsername) {
      return currentUsername;
    }

    var usersRef = firebase.database().ref("/users/" + currentUser?.uid);
    usersRef.on("value", (snapshot) => {
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