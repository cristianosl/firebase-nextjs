import { Timestamp, getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseApp } from "../../../../config/firebaseInit";
import { QueuePositionService } from "../../../../services/QueuePositionService";
import { FSQueuePosition } from "../../../firestore";
import { QueuePositionBodyData } from "./[userId]";

export const insertOrUpdateQueuePosition = async (
  req: NextApiRequest,
  res: NextApiResponse<FSQueuePosition>
) => {
  const {
    query: { userId },
    body,
  } = req;
  const { id, position, status, updatedAt, attendanceId } =
    body as QueuePositionBodyData;
  const newCoaPosition: FSQueuePosition = {
    id,
    position,
    status,
    updatedAt: Timestamp.fromDate(new Date(updatedAt)),
    attendanceId,
  };
  try {
    const db = getFirestore(firebaseApp);
    const queuePositionService = new QueuePositionService(db, Number(userId));
    await queuePositionService.insertOrUpdate(newCoaPosition);
  } catch (error) {
    console.log("error", error);
  }
  res.status(200).json(newCoaPosition);
};
