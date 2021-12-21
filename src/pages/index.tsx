import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { increment, decrement } from '../store/queue'
import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { useEffect, useState } from 'react'
import { firebaseApp } from '../config/firebase'
import { CardCoa, CardCoaProps } from '../components/CardCoa'


const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  const [messaging, setMessaging] = useState<Messaging>()
  const [cardCoa, setCardCoa] = useState<CardCoaProps>({
    id: "84182",
    position: "1",
    status: "ENQUEUED",
    updatedAt: new Date("2021-12-21T14:09:19.030Z"),
    attendanceId: null
  })

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
          onClick={() => setCardCoa({
            id: "84182",
            position: "1",
            status: "ENQUEUED",
            updatedAt: new Date("2021-12-21T14:09:19.030Z"),
            attendanceId: null
          })}
        >
          ENQUEUED
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => setCardCoa({
            id: "84182",
            position: null,
            status: "READY",
            updatedAt: new Date("2021-12-21T14:09:31.135Z"),
            attendanceId: null
          })}
        >
          READY
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => setCardCoa({
            id: "84182",
            position: null,
            status: "IN_CALL",
            updatedAt: new Date("2021-12-21T14:10:08.438Z"),
            attendanceId: "147608"
          })}
        >
          IN_CALL
        </button>
        <button
          className='btn btn-secondary'
          aria-label="Increment value"
          onClick={() => setCardCoa({
            id: "84182",
            position: null,
            status: "DONE",
            updatedAt: new Date("2021-12-21T14:10:34.968Z"),
            attendanceId: "147608"
          })}
        >
          DONE
        </button>
      </div>


      {/* <div className="row">
        <div className="col">
          <button
            className='btn btn-secondary'
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
        </div>
        <div className="col">
          <span>{count}</span>
        </div>
        <div className="col">
          <button
            className='btn btn-secondary'
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default Home
