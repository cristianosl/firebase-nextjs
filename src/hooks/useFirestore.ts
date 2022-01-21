import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { getFirebaseApp } from "../services/getFirebaseApp";
type LastUpdate = {
  date: Timestamp;
};
export const useFirestore = () => {
  const [loading, setLoading] = useState(false);

  const getNextUpdateDate = async () => {
    setLoading(true);
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const docRef = doc(db, "remoteConfig", "updateIn");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as LastUpdate;
    setLoading(false);
    return data.date.toDate();
  };

  return { loading, getNextUpdateDate };
};
