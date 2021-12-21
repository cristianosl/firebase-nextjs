import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { increment, decrement } from '../store/queue'

const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()



  return (
    <div className="container">
      <Head>
        <title>Testando Firebase com Redux</title>
        <meta name="description" content="Testando firebase com Redux" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Teste</h1>

      <div className="row">
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
      </div>
    </div>
  )
}

export default Home
