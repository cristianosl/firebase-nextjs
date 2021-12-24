import type { NextApiRequest, NextApiResponse } from "next";
import { FSQueuePosition } from "../../../firestore";
import { deleteQueuePosition } from "./deleteQueuePosition";
import { insertOrUpdateQueuePosition } from "./insertOrUpdateQueuePosition";

export type QueuePositionBodyData = Omit<FSQueuePosition, "updatedAt"> & {
  updatedAt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FSQueuePosition>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      await insertOrUpdateQueuePosition(req, res);
      break;
    case "DELETE":
      await deleteQueuePosition(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
