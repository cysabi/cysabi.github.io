import React from "react"

import { Link as GatsbyLink } from "gatsby"

import Layout from "../components/Layout"
import icon from "~/src/static/icon.svg"
import githubDark from "~/src/static/github.svg"
import githubLight from "~/src/static/github-light.svg"
import kofiDark from "~/src/static/kofi.svg"
import kofiLight from "~/src/static/kofi-light.svg"

import { useDarkMode } from "../components/DarkMode"

const bio = `heyo, i'm lepto! im a junior software developer, splatoon tournament organizer, boba addict, chiptune fanatic, and a kglues one-trick in splatoon`

const Index = () => (
  <Layout>
    <Hero />
    <Content
      links={
        <>
          <Link
            iconLight={githubLight}
            iconDark={githubDark}
            href="https://github.com/LeptoFlare"
          >
            i program open source stuff a lot, check out my github to see what
            i've built!
          </Link>
          <Link
            iconLight={kofiLight}
            iconDark={kofiDark}
            href="https://ko-fi.com/leptoflare"
          >
            i do code commissions! if you're interested in learning more, check
            out my ko-fi
          </Link>
        </>
      }
      footer={<Footer />}
    />
  </Layout>
)

const Hero = () => (
  <div className="min-h-screen bg-banner bg-cover bg-center flex items-center justify-center p-8 md:p-16">
    <div className="bg-white dark:bg-gray-800 max-w-4xl my-auto mx-auto rounded-lg p-8 md:p-16">
      <div className="flex flex-col gap-6 md:gap-9">
        <div className="flex flex-col gap-3 md:gap-6 items-start">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 justify-start md:h-32">
            <div className="flex self-stretch items-center h-28 md:h-32">
              <img alt="" src={icon} className="rounded-full max-h-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-5xl lg:text-7xl font-display font-light">
                LeptoFlare
              </div>
              <div className="text-gray-500 dark:text-gray-300 lg:text-xl font-mono font-light italic">
                preemptively compensating for inadequacy
              </div>
            </div>
          </div>
        </div>
        <div>{bio}</div>
        <div>
          don't be afraid to reach out! the best way to contact me is to send me
          a dm on{" "}
          <GatsbyLink className="link" to="/discord">
            discord at <code>LeptoFlare#4548</code>
          </GatsbyLink>
        </div>
      </div>
    </div>
  </div>
)

const Content = ({ links, footer }) => (
  <div className="bg-white dark:bg-gray-800 px-8">
    <div className="py-16">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-evenly">
        {links}
      </div>
    </div>
    <div className="border-gray-200 dark:border-gray-700 border-t-2 rounded-full" />
    {footer}
  </div>
)

const Link = ({ iconDark, iconLight, href, children }) => {
  const darkMode = useDarkMode()

  return (
    <a href={href} className="flex items-stretch max-w-lg">
      <div className="flex items-center rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
        <div className="flex sm:flex-row md:flex-col lg:flex-row gap-6 items-center justify-stretch min-h-10">
          <img
            alt=""
            src={darkMode.enabled ? iconDark : iconLight}
            className="max-h-10 w-10"
          />
          <div>{children}</div>
        </div>
      </div>
    </a>
  )
}

const Footer = () => {
  const darkMode = useDarkMode()

  return (
    <div className="p-4 text-sm text-gray-400 dark:text-gray-500 text-center">
      {"i built this website with "}
      <FooterLink href="https://www.gatsbyjs.com/">gatsby</FooterLink>
      {" and "}
      <FooterLink href="https://tailwindcss.com">tailwind</FooterLink>
      {", it's "}
      <FooterLink href="https://github.com/LeptoFlare/LeptoFlare.github.io">
        open sourced
      </FooterLink>
      {" on github! there's also a "}
      <button
        className="link text-gray-500 dark:text-gray-400"
        onClick={() => darkMode.toggle()}
      >
        {darkMode.enabled ? "light mode" : "dark mode"}
      </button>
    </div>
  )
}

const FooterLink = ({ href, children }) => (
  <a className="link text-gray-500 dark:text-gray-400" href={href}>
    {children}
  </a>
)

export default Index
