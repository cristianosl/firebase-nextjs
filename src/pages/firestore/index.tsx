import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { firebaseConfig } from '../../config/firebase'
import { useAppDispatch } from '../../store/hooks'
import { initializeApp } from 'firebase/app';
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { IQueuePosition, QueueStatus } from '../../types/QueuePosition'
import { updateQueue } from '../../store/queue'
import { getFirestore, doc, onSnapshot, DocumentData } from "firebase/firestore";

type FSQueuePosition = {
  id: number
  position: number
  status: QueueStatus
  updateAt: Date
}
const Firestore: NextPage = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const db = getFirestore(firebaseApp);
    const unsub = onSnapshot<DocumentData>(doc(db, "queuePositions", "123123"), (doc) => {
      const currentData = doc.data()
      const coaPosition: IQueuePosition = {
        attendanceId: null,
        id: currentData?.id || "0",
        position: currentData?.position || null,
        status: currentData?.status || "ENQUEUED",
        updatedAt: new Date(currentData?.updatedAt.seconds * 1000).toISOString()
      }
      console.log("Current data: ", currentData);
      console.log("coaPosition: ", coaPosition);
      dispatch(updateQueue(coaPosition))
    });
    return () => {
      unsub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Testando Firebase com Redux</title>
        <meta name="description" content="Testando firebase com Redux" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Firestore</li>
        </ol>
      </nav>
      <h2>Firestore</h2>
      <QueuePositions />
    </div>
  )
}

export default Firestore
