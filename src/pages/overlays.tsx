import Head from "next/head"

import LandingImageSection from "@/components/LandingImageSection"
import styles from "@/styles/Overlays.module.css"
import MainLayout from "@/components/MainLayout"

function overlaysChannel() {
  window.open("https://discord.com/channels/759894401957888031/809518867097190480");
}

export default function Overlays() {
  return (
    <>
      <Head>
        <title>Minecraft Server</title>
      </Head>
      <LandingImageSection>
        <section id={styles.TitleSection} className="imageTextWrapper">
          <h1 id={styles.Title}>{"Check out our dedicated Bridge Overlays channel in our Discord "}</h1>
          <button
            id={styles.ChannelButton}
            type="button"
            className="btn"
            onClick={overlaysChannel}
            title="Go To Channel"
          >
            # bridge-overlays
          </button>
        </section>
      </LandingImageSection>
    </>
  )
}

Overlays.Layout = MainLayout
