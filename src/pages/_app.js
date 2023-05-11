import { Poppins } from "next/font/google"
import { useEffect } from "react"
import Head from "next/head"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@/styles/globals.css"

const poppins = Poppins({
  weight: ["200", "400", "500", "600", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
})

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  })

  const wrapPage = Component.Layout ? (p) => <Component.Layout>{p}</Component.Layout> : (p) => p
  return (
    <>
      <Head>
        <title>Bridge Scrims</title>
        <meta name="title" content="Bridge Scrims" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id="__app" className={poppins.className}>
        {wrapPage(<Component {...pageProps} />)}
      </div>
    </>
  )
}
