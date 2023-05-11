import { HTMLAttributes } from "react"

export default function LandingImageSection({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section className="landingImageSection" {...props}>
      {children}
    </section>
  )
}