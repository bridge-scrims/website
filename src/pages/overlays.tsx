import MainLayout from "@/components/MainLayout"
import { getVerifiedSession } from "@/lib/auth"
import { GetServerSideProps } from "next"

interface MontagesProps {
	admin: boolean
}

export default function Montages({ admin }: MontagesProps) {
  return (
    <>
      
    </>
  )
}

export const getServerSideProps: GetServerSideProps<MontagesProps> = async (context) => {
  const verified = await getVerifiedSession(context.req, context.res)
  return { 
    props: { 
      admin: !!verified
    } 
  }
}

Montages.Layout = MainLayout