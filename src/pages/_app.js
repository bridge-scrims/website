import Layout from '@/components/layout'
import Head from 'next/head'

import { Poppins } from '@next/font/google'
import { useEffect } from "react"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@/styles/globals.css'

const poppins = Poppins({
  weight: ['200', '400', '500', '600', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: "swap"
})

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  })

  return (
    <div id="__app" className={poppins.className}>
      <Layout>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="dark light" />
          <meta name="title" content="Bridge Scrims" />
          <meta name="description" content="Ready to take your Bridge game to the next level? Join Bridge Scrims, the largest Bridge community on Discord! Checkout our Minecraft server, participate in tournaments, make friends, and sharpen your skills. Join us now!" />
          <meta name="keywords" content="Hypixel, The Bridge, community, tournaments, montages, texture packs, Minecraft, Discord" />
          <meta property="og:title" content="Join Bridge Scrims, the largest Bridge community on Discord!" />
          <meta property="og:description" content="Participate in tournaments, make friends, and sharpen your skills." />
          <meta property="og:image" content="https://www.bridgescrims.net/shaders-day.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}