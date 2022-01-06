import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import QueuePositions from '../../components/QueuePositions'
import Link from 'next/link'
import { ApolloProvider, gql, useSubscription } from '@apollo/client';
import { IQueuePosition } from '../../types/QueuePosition'
import { updateQueue } from '../../store/queue'
import { getApolloClient } from '../../services/getApolloClient'

const GET_QUEUE_BY_PATIENT_ID = gql`
  subscription GetQueueByPatientId($patientId: String!) {
    getQueueByPatientId(patientId: $patientId) {
      queueId
      patientId
      status
      position
      updatedAt
      attendanceId
    }
  }
`;

const GraphqlSubscriptions: React.VFC = () => {
  const dispatch = useAppDispatch()
  const { data, loading, error } = useSubscription(
    GET_QUEUE_BY_PATIENT_ID, {
    variables: {
      patientId: "123123"
    }
  }
  );
  // const { loading, error, data } = useQuery(GET_USERS);
  useEffect(() => {
    if (data && !loading) {
      const { getQueueByPatientId: { attendanceId, queueId, position, status, updatedAt } } = data
      const queuePosition: IQueuePosition = {
        attendanceId: attendanceId,
        id: queueId,
        position: position,
        status: status,
        updatedAt: updatedAt
      }
      dispatch(updateQueue(queuePosition))
      console.log('data', data)
    }
  }, [data, loading, error, dispatch])
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
          <li className="breadcrumb-item active" aria-current="page">Graphql Subscriptions</li>
        </ol>
      </nav>
      <h2>Graphql Subscriptions</h2>
      <QueuePositions />
    </div>
  )
}

const GraphqlSubscriptionsWithApollo: NextPage = () => <ApolloProvider client={getApolloClient()}>
  <GraphqlSubscriptions />
</ApolloProvider>
export default GraphqlSubscriptionsWithApollo