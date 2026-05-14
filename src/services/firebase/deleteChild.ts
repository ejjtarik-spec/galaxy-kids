import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firestore";

export const deleteChild = async (
  parentId: string,
  childId: string
) => {
  return deleteDoc(
    doc(db, "users", parentId, "children", childId)
  );
};