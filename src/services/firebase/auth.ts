import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  
  import { app } from "../../lib/firebase";
  
  export const auth = getAuth(app);
  
  const provider = new GoogleAuthProvider();
  
  export const signInWithGoogle = async () => {
    return signInWithPopup(auth, provider);
  };
  
  export const logout = async () => {
    return signOut(auth);
  };