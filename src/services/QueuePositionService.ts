import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { FSQueuePosition } from "../pages/firestore";
import { IQueuePosition } from "../types/QueuePosition";

type OnSuccessCb = (_pos: IQueuePosition) => void;

export class QueuePositionService {
  private ref: DocumentReference<DocumentData>;

  constructor(private _db: Firestore, private _pacientId: Number) {
    this.ref = doc(this._db, "queuePositions", this._pacientId.toString());
  }

  async exists() {
    const queuePositionSnap = await getDoc(this.ref);
    return queuePositionSnap.exists();
  }

  delete() {
    return deleteDoc(this.ref);
  }

  insertOrUpdate(position: FSQueuePosition) {
    return setDoc(this.ref, position);
  }

  onSnapshot(onSuccess: OnSuccessCb) {
    return onSnapshot(this.ref, (doc) => {
      const currentData = doc.data() as FSQueuePosition | undefined;
      console.log("Current data: ", currentData);
      if (currentData) {
        const dateSeconds = currentData.updatedAt.seconds * 1000;
        const queuePosition: IQueuePosition = {
          attendanceId: currentData.attendanceId?.toString() || null,
          id: currentData.id.toString(),
          position: currentData.position?.toString() || null,
          status: currentData.status,
          updatedAt: new Date(dateSeconds).toISOString(),
        };
        onSuccess(queuePosition);
      }
    });
  }
}
