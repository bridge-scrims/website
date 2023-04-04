import Head from "next/head"

import LandingImageSection from "@/components/LandingImageSection"
import styles from "@/styles/Fallback.module.css"
import MainLayout from "@/components/MainLayout"

export default function NotFound() {
	return (
		<>
			<Head>
				<title>Page not found</title>
			</Head>
			<LandingImageSection id={styles.ErrorWrapper}>
				<div className="imageTextWrapper">
					<h1 id={styles.Error}>404 - Page not found</h1>
					<h2 id={styles.ErrorDetails}>I hope you find what you&apos;re looking for.</h2>
				</div>
			</LandingImageSection>
		</>
	)
}

NotFound.Layout = MainLayout
