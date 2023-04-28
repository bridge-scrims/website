import { GetServerSideProps } from "next"
import { FormEventHandler } from "react"
import Image from "next/image"
import $ from "jquery"

import { request, HTTPError } from "@/lib/request"
import { getVerifiedSession } from "@/lib/auth"

import LandingImageSection from "@/components/LandingImageSection"
import styles from "@/styles/Login.module.css"
import logo from "/public/logo.png"

const Inputs = {
  Code: styles.Code,
  Submit: styles.Submit
}

const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault()
  const form = $(e.target)
  const codeInput = form.find("input[name='code']")
  const code = codeInput.val() as string
  if (code && form.attr("busy") === undefined) {
    form.attr("busy", "")
    request("/api/login", { method: "POST", body: new URLSearchParams({ code }) })
      .then(() => window.location.assign(`${window.location.origin}`))
      .catch((err) => {
        console.error(err)
        codeInput.addClass("is-invalid")
        if (err instanceof HTTPError) {
          try {
            codeInput.siblings(".invalid-feedback").text(JSON.parse(err.response)?.message)
          } catch {
            console.error(err)
          }
        }
      })
      .finally(() => form.attr("busy", null))
  }
}

export default function Login() {
  return (
    <>
      <LandingImageSection id={styles.Wrapper}>
        <form id={styles.Login} autoComplete="off" onSubmit={onSubmit}>
          <div id={styles.LogoWrapper}>
            <Image className={styles.logo} src={logo} alt="Logo" height="65" />
          </div>
          <h1>{"Log In"}</h1>
          <div className="mb-3">
            <label htmlFor="code" className="form-label form-check-label">
              Linking Code
            </label>
            <input type="text" className="form-control" name="code" placeholder="xxxx-xxxx-xxxx-xxxx" required />
            <div className="invalid-feedback">Couldn&apos;t be verified!</div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn form-control" id={Inputs.Submit}>
              Log in
            </button>
          </div>
        </form>
      </LandingImageSection>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const verified = await getVerifiedSession(context.req, context.res).catch(console.error)
  if (verified)
    return {
      redirect: {
        destination: "/",
        statusCode: 303
      }
    }
  return { props: {} }
}
