import Head from "next/head"

import LandingImageSection from "@/components/LandingImageSection"
import MainLayout from "@/components/MainLayout"
import styles from "@/styles/Overlays.module.css"

export default function Overlays() {
  return (
    <>
      <Head>
        <title>Bridge Overlays</title>
      </Head>
      <LandingImageSection>
        <section id={styles.TitleSection} className="imageTextWrapper">
          <h1 id={styles.Title}>{"Check out the dedicated Bridge Overlays channel in our Discord "}</h1>
          <a
            id={styles.ChannelButton}
            target="_blank"
            rel="noreferrer"
            href="https://discord.com/channels/759894401957888031/809518867097190480"
            title="Go To Channel"
          >
            # bridge-overlays
          </a>
        </section>
      </LandingImageSection>
    </>
  )
}

Overlays.Layout = MainLayout
