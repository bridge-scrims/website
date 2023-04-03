import Head from 'next/head'

import LandingImageSection from '@/components/LandingImageSection';
import MainLayout from '@/components/MainLayout'
import styles from '@/styles/Home.module.css'

const DISCORD_LINK = <a target="_blank" rel="noreferrer" href="https://discord.gg/bridgescrims" title="Discord Server">Discord</a>;

export default function Home() {
  return (
    <>
      <Head>
        <title>Bridge Scrims</title>
      </Head>
      <LandingImageSection>
        <h1 id={styles.Title}>
            <span>
              The largest<br/>Bridge<br/>community<br/>on {DISCORD_LINK}.
            </span>
            <iframe
              src="https://discord.com/widget?id=759894401957888031&theme=dark" 
              width="auto" height="auto" allowtransparency="true" title="Bridge Scrims Discord Overview"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
            </iframe>
        </h1>
      </LandingImageSection>
    </>
  )
}

Home.Layout = MainLayout