import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="description"
          content="Ready to take your Bridge game to the next level? Join Bridge Scrims, the largest Bridge community on Discord! Checkout our Minecraft server, participate in tournaments, make friends, and sharpen your skills. Join us now!"
        />
        <meta property="og:title" content="Join Bridge Scrims, the largest Bridge community on Discord!" />
        <meta
          property="og:description"
          content="Participate in tournaments, make friends, and sharpen your skills."
        />
        <meta property="og:image" content="https://www.bridgescrims.net/shaders-day.png" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
