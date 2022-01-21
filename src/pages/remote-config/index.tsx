import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';


const RemoteConfigPage: NextPage = () => {
  const { getConfigByName, loadedRemoteConfig } = useRemoteConfig()
  const [myConf, setMyConf] = useState<string>()

  console.log('loadedRemoteConfig', loadedRemoteConfig)
  useEffect(() => {
    const loadData = async () => {
      setMyConf(await getConfigByName('MY_CONF'))
    }
    loadData()
  }, [getConfigByName])


  if (!process.browser) return (<div>fora do navegador</div>)
  return (
    <div className="container">
      <Head>
        <title>Remote Config</title>
        <meta name="description" content="Testando firebase com Redux" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Remote Config</li>
        </ol>
      </nav>
      <h2>Remote Config</h2>

      <div>

        Configuração chamada: {myConf}
      </div>
    </div>
  )
}

export default RemoteConfigPage