import { createPopper } from "@popperjs/core"
import { createEffect, createSignal, For, onMount } from "solid-js"
import anime from "animejs"

import icon from "./static/icon.svg"
import github from "./static/github.svg"
import kofi from "./static/kofi.svg"

const content = {
  me: "LeptoFlare",
  subtext: "preemptively compensating for inadequacy",
  bio: [
    <p>
      heyo, i'm lepto! im a software developer and designer, tournament
      organizer, boba addict, chiptune fanatic, and a kglues one-trick in
      competitive splatoon
    </p>,
    <p>
      don't be afraid to reach out, i'm always open to new opportunities. the
      best way to contact me is to send me a dm on{" "}
      <a class="text-[#add9df]" href="https://discord.gg/faUNrfP">
        discord at <span class="font-semibold">LeptoFlare#4548</span>
      </a>
    </p>,
  ],
  badges: [
    {
      name: "off the dial",
      link: "https://otd.ink",
      icon: "https://assets.otd.ink/icon.svg",
      text: (
        <>
          i was one of the 2 head to's! not only did i do tourney organizing, i
          built the bot, the site, and the stream overlays
        </>
      ),
    },
    {
      name: "checkpoint 1",
      link: "https://twitter.com/Checkpoint1SPL",
      icon: "https://cdn.discordapp.com/icons/732634570285121576/6cdba9ae7dcba4c95a4cfb9cb83b66f8.webp",
      text: (
        <>
          i was one of the main baristas, and helped with server restructure. i
          was more focused on the server's competitive side, such as in-house
          tourneys
        </>
      ),
    },
    {
      name: "inkling performance labs",
      link: "https://iplabs.ink",
      icon: "https://iplabs.ink/images/logo.png",
      text: (
        <>
          i used to be part of technical staff. i did a complete rewrite radia,
          their discord bot for tourney management
        </>
      ),
    },
  ],
  links: [
    {
      icon: github,
      href: "https://github.com/LeptoFlare",
      text: (
        <>
          i develop open source stuff a lot. see my github profile readme for a
          portfolio of what i've built
        </>
      ),
    },
    {
      icon: kofi,
      href: "https://ko-fi.com/leptoflare",
      text: (
        <>
          i've opened code commissions! if you'd like to learn more, my options,
          terms, and pricing are on ko-fi
        </>
      ),
    },
  ],
}

const Index = () => (
  <main>
    <div class="min-h-screen bg-cover bg-center bg-[url('./static/banner.svg')] flex items-center justify-center p-8 md:p-16">
      <Card
        badges={
          <For each={content.badges}>{info => <Badge content={info} />}</For>
        }
      />
    </div>
    <div class="bg-slate-800 px-8">
      <Content />
      <Footer />
    </div>
  </main>
)

const Card = ({ badges }) => (
  <div class="text-lg bg-slate-800 max-w-4xl flex flex-col gap-6 md:gap-8 my-auto mx-auto rounded-lg p-8 md:p-16">
    <div class="flex flex-col gap-3 md:gap-4 items-start">
      <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6 justify-start">
        <div class="flex self-stretch items-center h-28 lg:h-32">
          <img alt="" src={icon} class="rounded-full max-h-full" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-5xl lg:text-7xl font-medium">{content.me}</div>
          <div class="text-slate-300 lg:text-xl font-mono italic">
            {content.subtext}
          </div>
        </div>
      </div>
      <div class="flex gap-3 md:gap-4 items-stretch justify-start">
        {badges}
      </div>
    </div>
    {content.bio}
  </div>
)

const Content = () => (
  <div class="py-16">
    <div class="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-evenly">
      <For each={content.links}>
        {link => (
          <LinkCard icon={link.icon} href={link.href}>
            {link.text}
          </LinkCard>
        )}
      </For>
    </div>
  </div>
)

const Footer = () => (
  <>
    <div class="border-slate-700 border-t-2 rounded-full w-full" />
    <div class="max-w-none p-4 text-sm text-slate-500 text-center">
      {"made with "}
      <a class="text-slate-400 font-medium" href="https://www.solidjs.com">
        {"solidjs"}
      </a>
      {" ("}
      <a class="text-slate-400 font-medium" href="https://vitejs.dev/">
        vite
      </a>
      {") and "}
      <a class="text-slate-400 font-medium" href="https://tailwindcss.com">
        tailwind
      </a>
      {", it's "}
      <a
        class="text-slate-400 font-medium"
        href="https://github.com/LeptoFlare/LeptoFlare.github.io"
      >
        open sourced on github
      </a>
      !
    </div>
  </>
)

const Badge = ({ content }) => {
  let elementRef
  let popperRef
  let animeRef

  onMount(() => {
    createPopper(elementRef, popperRef, {
      placement: "bottom",
    })
    anime({ targets: animeRef, scale: 0.9, opacity: 0, duration: 0 })
  })

  const setOpen = open => {
    anime({
      targets: animeRef,
      scale: open ? 1 : 0.9,
      opacity: open ? 1 : 0,
      easing: "spring(.5, 100, 100, 25)",
      change: anime => {
        anime.animations.find(elem => elem.property === "opacity")
          .currentValue <= 0
          ? popperRef.classList.add("invisible")
          : popperRef.classList.remove("invisible")
      },
    })
  }

  return (
    <div
      onBlur={() => setOpen(false)}
      onMouseLeave={() => setOpen(false)}
      classList={{ ["z-10"]: popperRef.style.opacity > 0 }}
    >
      <button
        onFocus={() => setOpen(true)}
        onMouseOver={() => setOpen(true)}
        ref={elementRef}
        class="h-10 w-10 md:h-12 md:w-12 object-center rounded-lg border-2 border-slate-700 bg-contain bg-slate-700"
        style={`background-image: url('${content.icon}');`}
      />
      <div ref={popperRef} class="invisible">
        <div ref={animeRef} class="p-2">
          <div class="bg-slate-900 max-w-lg rounded-lg shadow-xl p-3 md:p-6">
            <div class="flex flex-col gap-2">
              <span>
                <a
                  onFocus={() => setOpen(true)}
                  href={content.link}
                  class="font-bold hover:underline text-slate-300"
                >
                  {content.name}
                </a>
              </span>
              <div>{content.text}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LinkCard = ({ icon, href, children }) => (
  <a href={href} class="flex items-stretch max-w-lg">
    <div class="flex items-center rounded-lg border-2 border-slate-700 p-6 hover:shadow-xl transition-shadow">
      <div class="flex sm:flex-row md:flex-col lg:flex-row gap-6 items-center justify-stretch min-h-10">
        <img alt="" src={icon} class="max-h-10 w-10" />
        <p class="text-lg">{children}</p>
      </div>
    </div>
  </a>
)

export default Index
