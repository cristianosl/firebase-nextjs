import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';


const Home: NextPage = () => (
  <div className="container">
    <Head>
      <title>Testando Firebase com Redux</title>
      <meta name="description" content="Testando firebase com Redux" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">Home</li>
      </ol>
    </nav>
    <h1>Testes Firebase</h1>
    <ul>
      <li><Link href="/fcm">Cloud messaging</Link></li>
      <li><Link href="/realtime-database">Realtime Database</Link></li>
      <li><Link href="/firestore">Firestore Database</Link></li>
      <li><Link href="/graphql-subscriptions">Grapqh Subscriptions</Link></li>
    </ul>
  </div>
)

export default Home