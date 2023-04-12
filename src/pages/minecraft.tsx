import Head from 'next/head'

import LandingImageSection from '@/components/LandingImageSection';
import styles from '@/styles/Minecraft.module.css'
import MainLayout from '@/components/MainLayout';

function copyToClipboard() {
  navigator.clipboard.writeText("play.bridgescrims.net");
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Minecraft Server</title>
      </Head>
      <LandingImageSection>
        <section id={styles.TitleSection} className='imageTextWrapper'>
          <h1 id={styles.Title}>{"Join our feature-rich Minecraft server at "}</h1>
          <button id={styles.IpButton} type="button" className="btn" onClick={copyToClipboard} title="Copy to clipboard">
            <h1 id={styles.Ip}>{"play.bridgescrims.net"}</h1>
          </button>
        </section>
      </LandingImageSection>
    </>
  )
}

Home.Layout = MainLayout