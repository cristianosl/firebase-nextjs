import { Timestamp, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { FSQueuePosition } from "../../../firestore";
import { getQueuePositionByUserId } from "./getQueuePositionByUserId";
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
    await setDoc(getQueuePositionByUserId(Number(userId)), newCoaPosition);
  } catch (error) {
    console.log("error", error);
  }
  res.status(200).json(newCoaPosition);
};
