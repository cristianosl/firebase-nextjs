import { createReducer } from "@reduxjs/toolkit";
import {
  createQueue,
  updateQueuePosition,
  updateQueueStatusToReady,
  updateQueueStatusToDone,
  updateQueueStatusToInCall,
  updateQueue,
} from ".";
import { CardCoaProps } from "../../components/CardCoa";

const initialState: CardCoaProps = {
  id: "84182",
  position: null,
  status: "IN_CALL",
  updatedAt: "2021-12-21T14:10:08.438Z",
  attendanceId: "147608",
};
export const queueReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createQueue, (state, action) => {
      return action.payload;
    })
    .addCase(updateQueue, (state, action) => {
      return { ...state, ...action.payload };
    })
    .addCase(updateQueuePosition, (state, action) => {
      return {
        ...state,
        status: "ENQUEUED",
        ...action.payload,
      };
    })
    .addCase(updateQueueStatusToReady, (state, action) => {
      return {
        ...state,
        status: "READY",
        position: null,
        ...action.payload,
      };
    })
    .addCase(updateQueueStatusToInCall, (state, action) => {
      return {
        ...state,
        status: "IN_CALL",
        ...action.payload,
      };
    })
    .addCase(updateQueueStatusToDone, (state, action) => {
      return {
        ...state,
        status: "DONE",
        ...action.payload,
      };
    });
});
