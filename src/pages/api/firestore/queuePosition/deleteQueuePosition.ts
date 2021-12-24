import { deleteDoc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getQueuePositionByUserId } from "./getQueuePositionByUserId";

export const deleteQueuePosition = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userId },
  } = req;
  try {
    const queuePositionRef = getQueuePositionByUserId(Number(userId));
    const queuePositionSnap = await getDoc(queuePositionRef);

    if (queuePositionSnap.exists()) {
      await deleteDoc(queuePositionRef);
    } else {
      res.status(404).json({ status: "Not Found" });
    }
  } catch (error) {
    console.log("error", error);
  }
  res.status(200).json({ status: "OK" });
};
