import Head from 'next/head'
import styles from '@/styles/Minecraft.module.css'

export default function Home() {

  function copyToClipboard() {
    navigator.clipboard.writeText("play.bridgescrims.net");
  }

  return (
    <>
      <Head>
        <title>Minecraft Server</title>
      </Head>
      <section id={styles.LandingImageSection}>
        <section id={styles.TitleSection}>
          <h1 id={styles.Title}>{"Join our feature rich Minecraft server at "}</h1>
          <button type="button" className="btn" onClick={copyToClipboard} title="Copy to clipboard">
            <h1 id={styles.Ip}>{"play.bridgescrims.net"}</h1>
          </button>
        </section>
      </section>
    </>
  )
}
