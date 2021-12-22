import type { NextPage } from 'next'
import Head from 'next/head'
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { useEffect, useState } from 'react'
import { firebaseConfig } from '../config/firebase'
import { CardCoa, CardCoaProps } from '../components/CardCoa'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { createQueue, updateQueue, updateQueuePosition, updateQueueStatusToDone, updateQueueStatusToInCall, updateQueueStatusToReady } from '../store/queue';
import { shallowEqual } from 'react-redux';
import { initializeApp } from 'firebase/app';


const Home: NextPage = () => {
  const dispatch = useAppDispatch()

  const cardCoa = useAppSelector(state => state.queue, shallowEqual)
  useEffect(() => {
    // if (!process.browser) return

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);

    const messaging = getMessaging(firebaseApp)
    if (messaging) {
      getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_KEY_PAIR }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log('currentToken', currentToken)


          // messaging.subscribeToTopic(currentToken, 'TEST_TOPIC')
          //   .then((response) => {
          //     // See the MessagingTopicManagementResponse reference documentation
          //     // for the contents of response.
          //     console.log('Successfully subscribed to topic:', response);
          //   })
          //   .catch((error) => {
          //     console.log('Error subscribing to topic:', error);
          //   });
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
        // ...
      });

    }

  }, [])


  return (
    <div className="container">
      <Head>
        <title>Testando Firebase com Redux</title>
        <meta name="description" content="Testando firebase com Redux" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Teste</h1>
      <div className='row pb-3'>
        <div className="col">
          <CardCoa {...cardCoa} />
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between">
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {
            const enqueued: CardCoaProps = {
              id: "84182",
              position: "10",
              status: "ENQUEUED",
              updatedAt: "2021-12-21T14:09:10.030Z",
              attendanceId: null
            }
            dispatch(createQueue(enqueued))
          }}
        >
          CREATE QUEUE
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {

            dispatch(updateQueuePosition({
              position: "1",
              updatedAt: "2021-12-21T14:09:19.030Z"
            }))
          }}
        >
          UPDATE POSITION ENQUEUED
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {
            dispatch(updateQueue({
              id: "84182",
              position: "8",
              status: "ENQUEUED",
              updatedAt: "2021-12-21T14:02:10.030Z",
              attendanceId: null
            }))
          }}
        >
          UPDATE QUEUE
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {

            dispatch(updateQueueStatusToReady({ updatedAt: "2021-12-21T14:09:31.135Z" }))
          }}
        >
          READY
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {
            const inCall: CardCoaProps = {
              id: "84182",
              position: null,
              status: "IN_CALL",
              updatedAt: "2021-12-21T14:10:08.438Z",
              attendanceId: "147608"
            };
            dispatch(updateQueueStatusToInCall({ attendanceId: "147608", updatedAt: "2021-12-21T14:10:08.438Z" }))
          }}
        >
          IN_CALL
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {
            dispatch(updateQueueStatusToDone({ updatedAt: "2021-12-21T14:10:34.968Z" }))
          }}
        >
          DONE
        </button>
      </div>
    </div>
  )
}

export default Home