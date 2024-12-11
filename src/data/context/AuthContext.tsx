import firebase from "@/firebase/config";
import User from "@/model/User";
import router from "next/router";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  user?: User
  loading?: boolean
  loginGoogle?: () => Promise<void>
  login?: (userEmail: string, userPassword: string) => Promise<void>
  signup?: (userEmail: string, userPassword: string) => Promise<void>
  logOut?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({});

async function treatedUserObject(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    token,
    provider: firebaseUser.providerData[0]?.providerId,
    imageURL: firebaseUser.photoURL
  }
}

function manageCookie(isLoggedIn: boolean) {
  if(isLoggedIn) {
    Cookies.set("admin-template-auth", isLoggedIn, {
      expires: 7
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props: any) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  async function configureSession(firebaseUser) {
    if(firebaseUser?.email) {
      const finalUser = await treatedUserObject(firebaseUser);
      setUser(finalUser);
      manageCookie(true);
      setLoading(false);
      return finalUser.email;
    } else {
      setUser(null);
      manageCookie(false);
      setLoading(false);
      return false;
    }
  }

  async function signup(userEmail: string, userPassword: string) {
    try {
      setLoading(true);
      const response = await firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword);
  
      await configureSession(response.user);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function login(userEmail: string, userPassword: string) {
    try {
      setLoading(true);
      const response = await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
  
      await configureSession(response.user);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true);
      const response = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
  
      await configureSession(response.user);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function logOut() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configureSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(Cookies.get("admin-template-auth")){
      const cancel = firebase.auth().onIdTokenChanged(configureSession);
      return () => cancel();
    } else {
      setLoading(false);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      loginGoogle,
      logOut
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContext;