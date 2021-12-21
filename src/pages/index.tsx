import type { NextPage } from 'next'
import Head from 'next/head'
import { increment, decrement } from '../store/count'
import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { useEffect, useState } from 'react'
import { firebaseApp } from '../config/firebase'
import { CardCoa, CardCoaProps } from '../components/CardCoa'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { createQueue, updateQueue, updateQueuePosition, updateQueueStatusToDone, updateQueueStatusToInCall, updateQueueStatusToReady } from '../store/queue';
import { shallowEqual } from 'react-redux';


const Home: NextPage = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [messaging, setMessaging] = useState<Messaging>()

  const cardCoa = useAppSelector(state => state.queue, shallowEqual)
  useEffect(() => {
    setMessaging(getMessaging(firebaseApp))
    if (messaging) {
      console.log('process.env.NEXT_PUBLIC_FIREBASE_FCM_KEY_PAIR', process.env.NEXT_PUBLIC_FIREBASE_FCM_KEY_PAIR)
      getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_KEY_PAIR })
        .then((currentToken) => {
          console.log('oi')
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
          console.log('falhou')
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
    }

  }, [messaging])


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
              updatedAt: new Date("2021-12-21T14:09:10.030Z"),
              attendanceId: null
            }
            dispatch(createQueue(enqueued))
          }}
        >
          CREATE QUEUE 1
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {

            dispatch(updateQueuePosition({
              position: "1",
              updatedAt: new Date("2021-12-21T14:09:19.030Z")
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
              updatedAt: new Date("2021-12-21T14:02:10.030Z"),
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

            dispatch(updateQueueStatusToReady({ updatedAt: new Date("2021-12-21T14:09:31.135Z") }))
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
              updatedAt: new Date("2021-12-21T14:10:08.438Z"),
              attendanceId: "147608"
            };
            dispatch(updateQueueStatusToInCall({ attendanceId: "147608", updatedAt: new Date("2021-12-21T14:10:08.438Z") }))
          }}
        >
          IN_CALL
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => {
            dispatch(updateQueueStatusToDone({ updatedAt: new Date("2021-12-21T14:10:34.968Z") }))
          }}
        >
          DONE
        </button>
      </div>
    </div>
  )
}

export default Home
