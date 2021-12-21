import type { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import React, { useEffect } from 'react';
const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    /*   if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker.register("/rebase-messaging-sw.js").then(
            function (registration) {
              console.log("Service Worker registration successful with scope: ", registration.scope);
            },
            function (err) {
              console.log("Service Worker registration failed: ", err);
            }
          );
        });
      } */

  }, [])


  return (<Provider store={store}>
    <SafeHydrate>
      <Component {...pageProps} />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
    </SafeHydrate>
  </Provider>)
}

export default MyApp
