import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firestore";

export const buyReward = async (
  parentId: string,
  childId: string,
  price: number
) => {
  return updateDoc(
    doc(db, "users", parentId, "children", childId),
    {
      coins: increment(-price),
    }
  );
};