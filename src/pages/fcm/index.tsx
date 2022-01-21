import type { NextPage } from 'next'
import Head from 'next/head'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import QueuePositions from '../../components/QueuePositions';
import { updateQueue } from '../../store/queue';
import Link from 'next/link';
import { IQueuePosition } from '../../types/QueuePosition';
import { getFirebaseApp } from '../../services/getFirebaseApp';

const FCM: NextPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const messaging = getMessaging(getFirebaseApp())
    if (messaging) {
      getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_KEY_PAIR }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log('currentToken', currentToken)
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });


      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        if (payload.data?.redux_action) {
          const queuePosition = JSON.parse(payload.data.redux_action).payload as IQueuePosition
          dispatch(updateQueue(queuePosition))
          console.log('queuePosition', queuePosition)
        }
        // ...
      });

    }

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
          <li className="breadcrumb-item active" aria-current="page">Cloud Messaging</li>
        </ol>
      </nav>
      <h2>FCM</h2>
      <QueuePositions />
    </div>
  )
}

export default FCM