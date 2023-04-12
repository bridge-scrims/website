import { GetServerSideProps } from "next"
import Head from 'next/head'

import LandingImageSection from '@/components/LandingImageSection'
import { AdminBarProps } from "@/components/AdminBar"
import MainLayout from '@/components/MainLayout'
import { getVerifiedSession } from "@/lib/auth"
import styles from '@/styles/Home.module.css'
import dynamic from "next/dynamic"

const DISCORD_LINK = <a target="_blank" rel="noreferrer" href="https://discord.gg/bridgescrims" title="Discord Server">Discord</a>

const AdminBar = dynamic(
  () => import(`${'@/components/AdminBar'}`) as Promise<typeof import('@/components/AdminBar')>,
  { ssr: false }
)

interface HomeProps extends Partial<AdminBarProps> {}

export default function Home({ session }: HomeProps) {
  return (
    <>
      <Head>
        <title>Bridge Scrims</title>
      </Head>
      {session ? <AdminBar session={session}/> : <></>}
      <LandingImageSection>
        <h1 id={styles.Title}>
            <span>
              The largest<br/>Bridge<br/>community<br/>on {DISCORD_LINK}.
            </span>
            <iframe
              src="https://discord.com/widget?id=759894401957888031&theme=dark" 
              width="auto" height="auto" title="Bridge Scrims Discord Overview"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
            </iframe>
        </h1>
      </LandingImageSection>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const verified = await getVerifiedSession(context.req, context.res)
  if (!verified) return { props: {} }
  return { 
    props: { 
      session: { 
        name: verified.user.tag, 
        avatar: verified.displayAvatarURL() 
      }
    }
  }
}

Home.Layout = MainLayout