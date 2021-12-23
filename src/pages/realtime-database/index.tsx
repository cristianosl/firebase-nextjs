import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { firebaseConfig } from '../../config/firebase'
import { useAppDispatch } from '../../store/hooks'
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from "firebase/database";
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { IQueuePosition } from '../../types/QueuePosition'
import { updateQueue } from '../../store/queue'


const RealtimeDatabase: NextPage = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const db = getDatabase(firebaseApp);
    const starCountRef = ref(db, '/telemedicine/queuePositions/123123');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val() as IQueuePosition | undefined;
      if (data) {
        dispatch(updateQueue(data))
        console.log('data', data);
      }
    });
    /*
    {
      "123123": {
        "id": "84182",
        "position": "11",
        "status": "ENQUEUED",
        "updatedAt": "2021-12-21T14:09:10.030Z"
      }
    }
    */

  }, [dispatch])

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
          <li className="breadcrumb-item active" aria-current="page">Realtime Database</li>
        </ol>
      </nav>
      <h2>Realtime Database</h2>
      <QueuePositions />
    </div>
  )
}

export default RealtimeDatabase