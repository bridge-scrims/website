import Header from "./Header"
import { PropsWithChildren } from "react"

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
