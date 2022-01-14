import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

const QuitQueue: NextPage = () => {

  const handleBeforeUnload = (ev: BeforeUnloadEvent) => {
    console.log('handleBeforeUnload')
    ev.preventDefault()
    ev.returnValue = ''
  }
  const handleUnload = () => {
    console.log('handleUnload')
    const data = new FormData()
    data.set("userAgent", navigator.userAgent)
    navigator.sendBeacon('http://localhost:3001/api/quit-queue', data);
  }
  useEffect(() => {

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', handleUnload)
    // document.addEventListener('visibilitychange', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // document.removeEventListener('visibilitychange', handleUnload);
      window.removeEventListener('unload', handleUnload)

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
