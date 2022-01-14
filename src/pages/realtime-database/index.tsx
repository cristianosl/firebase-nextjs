import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { getDatabase, onDisconnect, onValue, ref, set } from "firebase/database";
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { IQueuePosition } from '../../types/QueuePosition'
import { updateQueue } from '../../store/queue'
import { firebaseApp } from '../../config/firebaseInit'
import { Timestamp } from 'firebase/firestore';


const RealtimeDatabase: NextPage = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {

    // Get a reference to the database service
    const db = getDatabase(firebaseApp);
    const userStatusDatabaseRef = ref(db, '/status/123123');
    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: Timestamp.now(),
    };
    const isOnlineForDatabase = {
      state: 'online',
      last_changed: Timestamp.now(),
    }
    onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
      console.log('set(userStatusDatabaseRef, isOnlineForDatabase)')
      set(userStatusDatabaseRef, isOnlineForDatabase)
    })


    const queueRef = ref(db, '/telemedicine/queuePositions/123123');
    const unsub = onValue(queueRef, (snapshot) => {
      const data = snapshot.val() as IQueuePosition | undefined;
      console.log('data', data);
      if (data) {
        dispatch(updateQueue(data))
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
          <li className="breadcrumb-item active" aria-current="page">Realtime Database</li>
        </ol>
      </nav>
      <h2>Realtime Database</h2>
      <QueuePositions />
    </div>
  )
}

export default RealtimeDatabase