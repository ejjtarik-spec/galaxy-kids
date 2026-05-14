import {
    doc,
    getFirestore,
    setDoc,
  } from "firebase/firestore";
  
  import { app } from "../../lib/firebase";
  
  export const db = getFirestore(app);
  
  export const createUserIfNotExists = async (
    user: any
  ) => {
    if (!user) return;
  
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
      },
      { merge: true }
    );
  };