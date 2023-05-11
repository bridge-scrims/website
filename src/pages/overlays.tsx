import MainLayout from "@/components/MainLayout"
import { getVerifiedSession } from "@/lib/auth"
import { GetServerSideProps } from "next"

interface OverlaysProps {
  admin: boolean
}

export default function Overlays({ admin }: OverlaysProps) {
  return <></>
}

export const getServerSideProps: GetServerSideProps<OverlaysProps> = async (context) => {
  return { notFound: true }
  const verified = await getVerifiedSession(context.req, context.res).catch(console.error)
  return {
    props: {
      admin: !!verified
    }
  }
}

Overlays.Layout = MainLayout
