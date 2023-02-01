import Head from 'next/head'
import styles from '../styles/Minecraft.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Minecraft Server</title>
      </Head>
      <section id={styles.LandingImageSection}>
        <section id={styles.TitleSection}>
          <h1 id={styles.Title}>{"Join our feature rich Minecraft server at "}</h1>
          <h1 id={styles.Ip}>{"play.bridgescrims.net"}</h1>
        </section>
      </section>
    </>
  )
}
