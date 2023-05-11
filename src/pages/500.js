import Head from "next/head"

import LandingImageSection from "@/components/LandingImageSection"
import styles from "@/styles/Fallback.module.css"
import MainLayout from "@/components/MainLayout"

export default function ServerError() {
  return (
    <>
      <Head>
        <title>Internal Server Error</title>
      </Head>
      <LandingImageSection id={styles.ErrorWrapper}>
        <div className="imageTextWrapper">
          <h1 id={styles.Error}>500 - Internal Server Error</h1>
          <h2 id={styles.ErrorDetails}>Something went wrong. Please try again later.</h2>
        </div>
      </LandingImageSection>
    </>
  )
}

ServerError.Layout = MainLayout
