import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firestore";

export const claimDailyBonus = async (
  parentId: string,
  childId: string
) => {
  const today = new Date().toISOString().split("T")[0];

  return updateDoc(
    doc(db, "users", parentId, "children", childId),
    {
      lastBonusDate: today,
      streak: increment(1),
      coins: increment(5),
      xp: increment(10),
    }
  );
};