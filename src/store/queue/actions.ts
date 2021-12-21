import { createAction } from "@reduxjs/toolkit";
import { CardCoaProps } from "../../components/CardCoa";

export const createQueue = createAction<CardCoaProps>("CREATE_QUEUE");

export const updateQueue = createAction<CardCoaProps>("UPDATE_QUEUE");

export const updateQueuePosition = createAction<
  Pick<CardCoaProps, "position" | "updatedAt">
>("UPDATE_QUEUE_POSITION");

export const updateQueueStatusToReady = createAction<
  Pick<CardCoaProps, "updatedAt">
>("UPDATE_QUEUE_STATUS_TO_READY");

export const updateQueueStatusToInCall = createAction<
  Pick<CardCoaProps, "attendanceId" | "updatedAt">
>("UPDATE_QUEUE_STATUS_TO_IN_CALL");

export const updateQueueStatusToDone = createAction<
  Pick<CardCoaProps, "updatedAt">
>("UPDATE_QUEUE_STATUS_TO_DONE");
