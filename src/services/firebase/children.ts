import { addDoc, collection } from "firebase/firestore";
import { db } from "./firestore";

export const createChild = async (
  parentId: string,
  child: {
    name: string;
    age: number;
    avatar: string;
  }
) => {
  return addDoc(collection(db, "users", parentId, "children"), {
    name: child.name,
    age: child.age,
    avatar: child.avatar,
    xp: 0,
    coins: 0,
    createdAt: new Date(),
  });
};