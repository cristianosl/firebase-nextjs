import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const QuitQueue: NextPage = () => {

  const handleBeforeUnload = (ev: BeforeUnloadEvent) => {
    console.log('handleBeforeUnload')
    ev.preventDefault()
    ev.returnValue = ''
  }
  const refHandleUnload = useRef<boolean>(false)

  function handleUnload() {

    if (refHandleUnload.current) return

    refHandleUnload.current = true
    console.log('handleUnload')

    fetch('http://192.168.15.23:3000/api/quit-queue', {
      keepalive: true,
      method: 'POST',
      body: 'fetch'
    })

    const idQueue = process.env.ID_QUEUE
    const token =  process.env.TOKEN
    const data = { "token": token, "idQueue": `${idQueue}` }

    navigator.sendBeacon('http://192.168.15.23:3000/api/quit-queue', JSON.stringify(data));
    navigator.sendBeacon('https://quitqueuenav.azurewebsites.net/api/quitqueuenav', JSON.stringify(data));
  }
  useEffect(() => {
    if (!navigator.sendBeacon) { return; }
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', handleUnload)
    window.addEventListener('pagehide', handleUnload)
    // document.addEventListener('visibilitychange', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // document.removeEventListener('visibilitychange', handleUnload);
      window.removeEventListener('unload', handleUnload)
      window.removeEventListener('pagehide', handleUnload)

    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Testando sair da aplicação ao fechar a janela</title>
        <meta name="description" content="Testando firebase com Redux" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">QuitQueue</li>
        </ol>
      </nav>
      <h2>QuitQueue</h2>

      <p>Feche a aba!</p>
    </div>
  )
}

export default QuitQueue
