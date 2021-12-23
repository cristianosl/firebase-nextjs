import { createAction } from "@reduxjs/toolkit";
import { IQueuePosition } from "../../types/QueuePosition";

export const createQueue = createAction<IQueuePosition>("CREATE_QUEUE");

export const updateQueue = createAction<IQueuePosition>("UPDATE_QUEUE");

export const updateQueuePosition = createAction<
  Pick<IQueuePosition, "position" | "updatedAt">
>("UPDATE_QUEUE_POSITION");

export const updateQueueStatusToReady = createAction<
  Pick<IQueuePosition, "attendanceId" | "updatedAt">
>("UPDATE_QUEUE_STATUS_TO_READY");

export const updateQueueStatusToInCall = createAction<
  Pick<IQueuePosition, "attendanceId" | "updatedAt">
>("UPDATE_QUEUE_STATUS_TO_IN_CALL");

export const updateQueueStatusToDone = createAction<
  Pick<IQueuePosition, "attendanceId" | "updatedAt">
>("UPDATE_QUEUE_STATUS_TO_DONE");
