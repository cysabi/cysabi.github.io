import React from "react"
import { usePopper } from "react-popper"
import { Link } from "gatsby"
import anime from "animejs"

import Layout from "../components/Layout"
import icon from "~/src/static/icon.svg"
import githubDark from "~/src/static/github.svg"
import githubLight from "~/src/static/github-light.svg"
import kofiDark from "~/src/static/kofi.svg"
import kofiLight from "~/src/static/kofi-light.svg"

import { useDarkMode } from "../components/DarkMode"

const content = {
  me: "LeptoFlare",
  subtext: "preemptively compensating for inadequacy",
  bio: [
    <>
      heyo, i'm lepto! im a junior software developer, splatoon tournament
      organizer and production person, boba addict, chiptune fanatic, and a
      kglues one-trick in splatoon
    </>,
    <>
      don't be afraid to chat with me! the best way to contact me is to send me
      a dm on{" "}
      <Link className="link" to="/discord">
        discord at <code>LeptoFlare#4548</code>
      </Link>
    </>,
  ],
  orgs: [
    {
      name: "Off the Dial",
      link: "https://otd.ink",
      icon: "https://assets.otd.ink/icon.svg",
      text: (
        <>
          i'm one of the head to's! in addition to organizing the tournament,
          i'm also the one who built the bot, the site, and the stream overlays!
          all from scratch
        </>
      ),
    },
    {
      name: "Checkpoint 1",
      link: "https://twitter.com/Checkpoint1SPL",
      icon: "https://cdn.discordapp.com/icons/732634570285121576/6cdba9ae7dcba4c95a4cfb9cb83b66f8.webp",
      text: (
        <>
          i'm one of the main baristas! alongside star, i manage the server
          structurally, i also play a big role organizing the in-house tourneys
        </>
      ),
    },
    {
      name: "Inkling Performance Labs",
      link: "https://iplabs.ink",
      icon: "https://iplabs.ink/images/logo.png",
      text: (
        <>
          i'm part of technical staff. i mainly work on radia and am
          occasionally allowed to help on other stuff with vincent
        </>
      ),
    },
  ],
  links: [
    {
      icon: [githubLight, githubDark],
      href: "https://github.com/LeptoFlare",
      text: (
        <>
          i make open source stuff a lot, check out my github to see what i've
          built
        </>
      ),
    },
    {
      icon: [kofiLight, kofiDark],
      href: "https://ko-fi.com/leptoflare",
      text: (
        <>
          i do code commissions! if you want to learn more, check out my ko-fi
        </>
      ),
    },
  ],
}

const Index = () => (
  <Layout>
    <div className="min-h-screen bg-banner bg-cover bg-center flex items-center justify-center p-8 md:p-16">
      <Card />
    </div>
    <Content footer={<Footer />} />
  </Layout>
)

const Card = () => (
  <div className="bg-white dark:bg-gray-800 max-w-4xl flex flex-col gap-6 md:gap-8 my-auto mx-auto rounded-lg p-8 md:p-16">
    <div className="flex flex-col gap-3 md:gap-4 items-start">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 justify-start md:h-32">
        <div className="flex self-stretch items-center h-28 md:h-32">
          <img alt="" src={icon} className="rounded-full max-h-full" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-5xl lg:text-7xl font-display font-light">
            {content.me}
          </div>
          <div className="text-gray-500 dark:text-gray-300 lg:text-xl font-mono font-light italic">
            {content.subtext}
          </div>
        </div>
      </div>
      <div className="flex gap-3 md:gap-4 items-stretch justify-start">
        {content.orgs.map((org, index) => (
          <Org key={index} org={org} />
        ))}
      </div>
    </div>
    {content.bio.map((bioSection, index) => (
      <div key={index}>{bioSection}</div>
    ))}
  </div>
)

const Content = ({ footer }) => (
  <div className="bg-white dark:bg-gray-800 px-8">
    <div className="py-16">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-evenly">
        {content.links.map((link, index) => (
          <Social
            key={index}
            iconLight={link.icon[0]}
            iconDark={link.icon[1]}
            href={link.href}
          >
            {link.text}
          </Social>
        ))}
      </div>
    </div>
    {footer}
  </div>
)

const Footer = () => {
  const darkMode = useDarkMode()
  const linkStyles = "link text-gray-500 dark:text-gray-400"

  return (
    <>
      <div className="border-gray-200 dark:border-gray-700 border-t-2 rounded-full" />
      <div className="p-4 text-sm text-gray-400 dark:text-gray-500 text-center">
        {"i built this website with "}
        <a className={linkStyles} href="https://www.gatsbyjs.com/">
          gatsby
        </a>
        {" and "}
        <a className={linkStyles} href="https://tailwindcss.com">
          tailwind
        </a>
        {", it's "}
        <a
          className={linkStyles}
          href="https://github.com/LeptoFlare/LeptoFlare.github.io"
        >
          open sourced
        </a>
        {" on github! there's also a "}
        <button
          className="link text-gray-500 dark:text-gray-400"
          onClick={() => darkMode.toggle()}
        >
          {darkMode.enabled ? "light mode" : "dark mode"}
        </button>
      </div>
    </>
  )
}

const Org = ({ org }) => {
  const [open, setOpen] = React.useState(false)
  const elementRef = React.useRef()
  const popperRef = React.useRef()
  const animateRef = React.useRef()
  const { styles, attributes } = usePopper(
    elementRef.current,
    popperRef.current,
    { placement: "bottom" }
  )

  React.useEffect(() => {
    anime({
      targets: animateRef.current,
      scale: open ? 1 : 0.9,
      opacity: open ? 1 : 0,
      easing: "spring(.5, 100, 100, 25)",
      change: anime => {
        anime.animations.find(elem => elem.property === "opacity")
          .currentValue <= 0
          ? popperRef.current.classList.add("invisible")
          : popperRef.current.classList.remove("invisible")
      },
    })
  }, [open])

  return (
    <div
      onBlur={() => setOpen(false)}
      onMouseLeave={() => setOpen(false)}
      className={open && "z-10"}
    >
      <button
        onFocus={() => setOpen(true)}
        onMouseOver={() => setOpen(true)}
        ref={elementRef}
        className="h-10 w-10 md:h-12 md:w-12 object-center rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-contain bg-gray-200 dark:bg-gray-700"
        style={{ backgroundImage: `url(${org.icon})` }}
      />
      <div
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        className="invisible"
      >
        <div ref={animateRef} className="p-2">
          <div className="bg-gray-100 dark:bg-gray-900 max-w-lg rounded-lg shadow-xl p-3 md:p-6">
            <div className="flex flex-col gap-2">
              <span>
                <a
                  href={org.link}
                  className="font-bold hover:underline text-gray-600 dark:text-gray-300"
                >
                  {org.name}
                </a>
              </span>
              <div>{org.text}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Social = ({ iconDark, iconLight, href, children }) => {
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

export default Index
