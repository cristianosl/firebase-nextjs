import { Timestamp, getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseApp } from "../../../../services/getFirebaseApp";
import { PatientQueuePositionService } from "../../../../services/PatientQueuePositionService";
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
  const newQueuePosition: FSQueuePosition = {
    id,
    position,
    status,
    updatedAt: Timestamp.fromDate(new Date(updatedAt)),
    attendanceId,
  };
  try {
    const db = getFirestore(getFirebaseApp());
    const patientQueuePosition = new PatientQueuePositionService(
      db,
      Number(userId)
    );
    await patientQueuePosition.insertOrUpdate(newQueuePosition);
  } catch (error) {
    console.log("error", error);
  }
  res.status(200).json(newQueuePosition);
};
