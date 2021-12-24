import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { IQueuePosition, QueueStatus } from '../../types/QueuePosition'
import { updateQueue } from '../../store/queue'
import { onSnapshot, Timestamp } from "firebase/firestore";
import { getQueuePositionByUserId } from '../api/firestore/queuePosition/getQueuePositionByUserId'

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

    const unsub = onSnapshot(getQueuePositionByUserId(123123), (doc) => {
      const currentData = doc.data() as FSQueuePosition | undefined
      if (currentData) {
        const dateSeconds = currentData.updatedAt.seconds * 1000
        const coaPosition: IQueuePosition = {
          attendanceId: currentData.attendanceId?.toString() || null,
          id: currentData.id.toString(),
          position: currentData.position?.toString() || null,
          status: currentData.status,
          updatedAt: new Date(dateSeconds).toISOString()
        }
        console.log("Current data: ", currentData);
        console.log("coaPosition: ", coaPosition);
        dispatch(updateQueue(coaPosition))
      }
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
