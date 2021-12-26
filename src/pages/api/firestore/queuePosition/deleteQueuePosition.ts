import { getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseApp } from "../../../../config/firebaseInit";
import { QueuePositionService } from "../../../../services/QueuePositionService";

export const deleteQueuePosition = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userId },
  } = req;
  try {
    const db = getFirestore(firebaseApp);
    const queuePositionService = new QueuePositionService(db, Number(userId));
    if (await queuePositionService.exists()) {
      await queuePositionService.delete();
    } else {
      res.status(404).json({ status: "Not Found" });
    }
  } catch (error) {
    console.log("error", error);
  }
  res.status(200).json({ status: "OK" });
};
