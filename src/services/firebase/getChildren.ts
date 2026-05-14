import { collection, getDocs } from "firebase/firestore";
import { db } from "./firestore";

export const getChildren = async (parentId: string) => {
  const snapshot = await getDocs(
    collection(db, "users", parentId, "children")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};