import { doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../config/firebaseInit";

export const getQueuePositionByUserId = (userId: number) => {
  const db = getFirestore(firebaseApp);
  return doc(db, "queuePositions", userId.toString());
};
