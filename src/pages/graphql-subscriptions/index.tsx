import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { gql, useSubscription } from '@apollo/client';

const USER_ADDED = gql`
  subscription UserAdded {
    userAdded {
      _id
      name
      email
      active
    }
  }
`;
const GET_USERS = gql`
  query Users {
    users {
      _id
      name
      email
      active
    }
  }
`

const GraphqlSubscriptions: NextPage = () => {


  const dispatch = useAppDispatch()
  const { data, loading, error } = useSubscription(
    USER_ADDED
  );
  // const { loading, error, data } = useQuery(GET_USERS);
  useEffect(() => {
    console.log('data', data)
    console.log('loading', loading)
    console.log('error', error)
  }, [data, loading, error])
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
      <h2>Graphql Subscriptions</h2>
      <QueuePositions />
    </div>
  )
}

export default GraphqlSubscriptions
