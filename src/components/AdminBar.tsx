import Image from "next/image"
import styles from "@/styles/AdminBar.module.css"

export interface AdminBarProps {
  session: {
    name: string
    avatar: string
  }
  showNotice?: boolean
}

export function AdminNotice() {
  return (
    <div id={styles.AdminNotice} role="alert">
      <i className="bi bi-exclamation-triangle-fill"></i>
      <span>
        As a logged-in user, you have additional functionality on certain pages, such as edit, create, and delete
        buttons.
        <b>
          {" "}
          Please use these functions with caution, as any changes you make will be reflected on the live site.
        </b>
      </span>
    </div>
  )
}

export default function AdminBar({ session, showNotice }: AdminBarProps) {
  return (
    <>
      <div id={styles.AdminBar}>
        <span id={styles.Welcome}>{"Welcome"}</span>
        <div id={styles.Profile}>
          <Image alt="Avatar" src={session.avatar} width={30} height={30} />
          <span className="name">{session.name}</span>
        </div>
      </div>
      {showNotice === false ? <></> : <AdminNotice />}
    </>
  )
}
