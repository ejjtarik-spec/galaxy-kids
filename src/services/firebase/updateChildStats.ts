import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firestore";

export const addChildReward = async (
  parentId: string,
  childId: string,
  xp: number,
  coins: number
) => {
  return updateDoc(
    doc(db, "users", parentId, "children", childId),
    {
      xp: increment(xp),
      coins: increment(coins),
    }
  );
};