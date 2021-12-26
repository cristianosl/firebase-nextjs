import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { QueueStatus } from '../../types/QueuePosition'
import { updateQueue } from '../../store/queue'
import { getFirestore, Timestamp } from "firebase/firestore";
import { firebaseApp } from '../../config/firebaseInit'
import { QueuePositionService } from '../../services/QueuePositionService'

export type FSQueuePosition = {
  id: number
  attendanceId?: number | null
  position: number | null
  status: QueueStatus
  updatedAt: Timestamp
}
const Firestore: NextPage = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const queuePositionService = new QueuePositionService(db, 123123);
    const unsub = queuePositionService.onSnapshot((queuePosition) => {
      console.log("coaPosition: ", queuePosition);
      dispatch(updateQueue(queuePosition))
    })
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
