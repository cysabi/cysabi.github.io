import { Motion, Presence } from "@motionone/solid"
import { A, useLocation } from "@solidjs/router"
import { spring } from "motion"
import { createMemo, createSignal, onMount } from "solid-js"
import { useGrid } from "../components/grid"
import slurk from "../static/slurk.png"
import { works } from "./works/index"

const Index = () => {
  const { setColor } = useGrid()
  onMount(() => {
    setColor(false)
  })
  return (
    <>
      <LandingScreen />
      <SelectedWorksScreen />
    </>
  )
}

const LandingScreen = () => {
  const location = useLocation()

  const subtitles = [
    "perfectionist for people's experiences",
    "perfectionist for serving others",
    "thinker for how people think",
    "software engineer capable of empathy",
    "designer for interactive experiences",
    "focused on sporadic projects",
    "comp sci's biggest hater",
    "🧋❤️",
  ]
  const [index, setIndex] = createSignal(0)
  const [hoverSlurk, setHoverSlurk] = createSignal(false)

  return (
    <div class="flex flex-col justify-between max-w-7xl min-h-screen mx-auto p-[min(10vw,128px)]">
      <div class="flex flex-col flex-1">
        <div class="flex flex-col-reverse items-start gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ easing: spring({ damping: 20 }) }}
              class="text-4xl lg:text-5xl"
            >
              hey, i'm cysabi
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, easing: spring({ damping: 20 }) }}
              class="text-slate-300 text-3xl lg:text-4xl"
            >
              {subtitles[index()]}
            </Motion.div>
            <div class="flex pt-12 gap-8 text-2xl flex-wrap">
              <Motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, easing: spring({ damping: 20 }) }}
                href="https://github.com/cysabi"
                class="flex items-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 transition-all text-slate-300 hover:text-primary hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Motion.a>
              {/* <Motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, easing: spring({ damping: 20 }) }}
                href="https://twitter.com/cysabi"
                class="flex items-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 transition-all text-slate-300 hover:text-primary hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Motion.a> */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.275, easing: spring({ damping: 20 }) }}
                class="rounded-full h-1.5 w-1.5 my-auto bg-slate-500"
              ></Motion.div>
              <Motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, easing: spring({ damping: 20 }) }}
                class="inline link"
                onClick={() =>
                  document
                    .getElementById("works")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                works
              </Motion.button>
              <Motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, easing: spring({ damping: 20 }) }}
              >
                <A
                  href={location.hash === "#contact" ? "/" : "#contact"}
                  noScroll
                >
                  {location.hash === "#contact" ? "about" : "contact"}
                </A>
              </Motion.span>
            </div>
          </div>
          <Motion.button
            initial={{ scale: 0.8, rotate: 6 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              easing: spring({ mass: 0.6, damping: 5 }),
            }}
            onClick={() => setIndex((index() + 1) % subtitles.length)}
          >
            <Motion.img
              onmouseenter={() => setHoverSlurk(true)}
              onmouseleave={() => setHoverSlurk(false)}
              animate={{
                scale: hoverSlurk() ? 1.1 : 1,
                rotate: hoverSlurk() ? 2 : 0,
              }}
              transition={{ easing: spring({ mass: 0.5, stiffness: 300 }) }}
              src={slurk}
              class="h-28 md:h-32 lg:h-48 rounded"
            />
          </Motion.button>
        </div>
        <div class="relative my-12 md:my-16 flex-1 max-h-full">
          <Presence>
            <Switch
              fallback={
                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    easing: spring({ mass: 0.1 }),
                  }}
                  class="flex flex-col gap-4 rounded-2xl text-2xl text-slate-400"
                >
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, easing: spring({ damping: 20 }) }}
                  >
                    hi, thanks for stopping by! ~ i'm a multi-disciplinary
                    autodidact that's passionate about{" "}
                    <span class="font-medium text-slate-50">
                      learning how people think
                    </span>
                    , and using that info{" "}
                    <span class="font-medium text-slate-50">
                      to craft interactive experiences
                    </span>
                    .
                  </Motion.div>
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, easing: spring({ damping: 20 }) }}
                  >
                    my story started{" "}
                    <span class="font-medium text-slate-50">
                      with a quest to improve the tournament experience
                    </span>{" "}
                    in the competitive splatoon community, when i taught myself
                    python to build a bot to streamline registration. since
                    then, i've picked up many more skills to meet the
                    community's evolving needs.
                  </Motion.div>
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, easing: spring({ damping: 20 }) }}
                  >
                    {" "}
                    nothing i've built was for a grade in a class,{" "}
                    <span class="font-medium text-slate-50">
                      everything i've learned has come from serving real people
                    </span>
                    ; i bring an unapologetically user-centric perspective to
                    solving problems.
                  </Motion.div>
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, easing: spring({ damping: 20 }) }}
                  >
                    <span class="font-medium text-slate-50">
                      it's never the role i'm filling, but the people i'm
                      serving that excites me the most!
                    </span>{" "}
                    so i'm always open to new opportunities, no matter the
                    medium! if you like what you see and want to work with me,
                    don't hesitate to{" "}
                    <A href="/#contact" class="font-medium text-slate-50">
                      reach out!
                    </A>
                  </Motion.div>
                </Motion.div>
              }
            >
              <Match when={location.hash === "#contact"}>
                <Contact />
              </Match>
            </Switch>
          </Presence>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
          />
        </svg>

        <h2 class="font-medium text-xl" id="works">
          featured works
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
          />
        </svg>

        <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
      </div>
    </div>
  )
}

const Contact = () => {
  let formRef
  const [talk, setTalk] = createSignal("")
  const [done, setDone] = createSignal(false)
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        easing: spring({ mass: 0.1 }),
      }}
      class="absolute inset-0 flex flex-col"
    >
      <form
        ref={formRef}
        class="flex flex-col gap-4 h-full text-slate-300"
        target="dummyframe"
        method="POST"
        action="https://formsubmit.io/send/leptoflare@gmail.com"
        onsubmit={() => setDone(true)}
      >
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, easing: spring({ damping: 20 }) }}
          class="text-2xl"
        >
          like what you see? got something in mind? let's talk!
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, easing: spring({ damping: 20 }) }}
          class="flex gap-4 flex-col md:flex-row"
        >
          <input
            onchange={e => setTalk(e.currentTarget.value)}
            placeholder="what do you prefer to go by?"
            name="name"
            type="text"
            autocomplete="off"
            required
            class="flex-1"
          />
          <input
            placeholder="what's your email?"
            name="email"
            type="email"
            autocomplete="off"
            required
            class="flex-1"
          />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, easing: spring({ damping: 20 }) }}
          class="h-full"
        >
          <textarea
            class="resize-none flex-1 w-full h-full"
            placeholder={`hey ${
              talk() || "there"
            }! what would you like to share with me?`}
            name="comment"
            required
          ></textarea>
        </Motion.div>
        <Motion.div
          class="flex justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, easing: spring({ damping: 20 }) }}
        >
          {done() ? (
            <div class="text-xl font-medium">
              thanks for sharing! i'll get back to you as soon i can
            </div>
          ) : (
            <button
              class="text-xl font-medium link"
              value="submit"
              type="submit"
            >
              send message
            </button>
          )}
        </Motion.div>
        <input
          name="_formsubmit_id"
          type="text"
          style="display:none"
          autocomplete="off"
        />
      </form>
      <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
    </Motion.div>
  )
}

const SelectedWorksScreen = () => {
  const [scrollY, setScrollY] = createSignal(0)
  addEventListener("scroll", () => {
    setScrollY(window.scrollY)
  })

  return (
    <div class="flex h-[calc(100vh-19rem)] -mb-32 mx-auto max-w-[1728px]">
      <div class="w-full h-full grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))]">
        {works
          .filter(work => work.data.layer !== undefined)
          .map(work => (
            <ProjectOrb {...work.data} scrollY={scrollY} />
          ))}
      </div>
    </div>
  )
}

const ProjectOrb = props => {
  let ref,
    titleRef,
    top = 0,
    size = 384
  const angle = Math.random() * Math.PI * 2
  const imgOffset = {
    x: Math.cos(angle) * size,
    y: Math.sin(angle) * size,
  }
  const scale = 1 + props.layer * 0.125

  const { setColor } = useGrid()
  const [titleHeight, setTitleHeight] = createSignal(0)
  const [lean, setLean] = createSignal({ img: imgOffset, orb: { x: 0, y: 0 } })
  const [hov, setHov] = createSignal(false)

  onMount(() => {
    top = ref.getBoundingClientRect().top + window.scrollY
    setTitleHeight(titleRef.getBoundingClientRect().height)
  })

  const y = createMemo(
    () => (top / 2 - props.scrollY()) * (1.75 + props.layer * 0.5)
  )

  return (
    <div
      style={`
        z-index: ${(20 + (hov() ? 1 : props.layer)) * 2};
        grid-column-start: ${props.coords[0]};
        grid-row-start: ${props.coords[1]};`}
    >
      <div
        ref={ref}
        class="ml-[50%]"
        style={`
          transform: translate(-50%, ${y()}px) scale(${scale});
          height: ${size}px;
          width: ${size}px;
        `}
      >
        <div class="z-10 absolute h-full flex items-center justify-center pointer-events-none">
          <Motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: hov() ? 1 : 0,
              x: lean().img.x,
              y: lean().img.y,
            }}
            transition={{
              easing: spring({ mass: 0.3, stiffness: 25 }),
            }}
          >
            <img
              class="rounded"
              style={`transform: rotate(${
                (4 + Math.floor(Math.random() * 4)) *
                Math.sign(Math.random() - 0.5)
              }deg)`}
              src={props.previews?.[0]}
            />
          </Motion.div>
        </div>
        <A
          href={"works/" + props.name}
          class={props.soon && "cursor-default pointer-events-none opacity-50"}
        >
          <Motion.div
            onmouseenter={() => {
              setHov(true)
              setColor("#a6ffe0")
            }}
            onmouseleave={() => {
              setLean({ img: imgOffset, orb: { x: 0, y: 0 } })
              setHov(false)
              setColor(false)
            }}
            onmousemove={e => {
              const rect = ref.getBoundingClientRect()
              const x = e.clientX - (rect.x + rect.width / 2)
              const y = e.clientY - (rect.y + rect.height / 2)
              setLean({
                img: {
                  x: x / 8 + imgOffset.x,
                  y: y / 8 + imgOffset.y,
                },
                orb: {
                  x: Math.sqrt(Math.abs(x)) * Math.sign(x) * 2,
                  y: Math.sqrt(Math.abs(y)) * Math.sign(y) * 2,
                },
              })
            }}
            initial={{ borderColor: "rgb(71 85 105 / 0.5)" }}
            animate={{
              x: lean().orb.x,
              y: lean().orb.y,
              scale: hov() ? 1.2 : 1,
              backgroundColor: hov()
                ? "rgb(51 65 85 / 0.5)"
                : "rgb(15 23 42 / 0.5)",
              borderColor: hov()
                ? "rgb(71 85 105 / 0.5)"
                : "rgb(51 65 85 / 0.5)",
            }}
            transition={{
              easing: spring({ stiffness: 500, damping: 50 }),
            }}
            class="rounded-full h-full w-full flex items-center justify-center backdrop-blur transition-none border-transparent"
            style={`border-width: ${4 / scale}px`}
          >
            <div class="absolute inset-0 p-6 rounded-full flex items-center justify-center">
              <Motion.div
                ref={titleRef}
                animate={{
                  scale: hov() ? 0.75 : 1,
                  y: hov() ? (titleHeight() - size / 2) * scale - 12 : 0,
                }}
                class="flex flex-col gap-2 items-center text-center origin-top"
              >
                <div class="flex items-center justify-center gap-1 rounded-full overflow-clip">
                  {props.tags?.slice(0, 2)?.map(tag => (
                    <div class="leading-none py-1 px-2 text-2xl font-medium bg-primary/10 rounded-md text-primary backdrop-blur backdrop-brightness-125">
                      {tag}
                    </div>
                  ))}
                </div>
                <div class="font-mono text-4xl font-semibold">{props.name}</div>
              </Motion.div>
            </div>
            <div class="absolute inset-0 p-6 rounded-full flex flex-col items-center text-center justify-between text-2xl">
              <div style={{ height: `${titleHeight()}px` }} />
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hov() ? 1 : 0 }}
              >
                {props.desc}
              </Motion.div>
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hov() ? 1 : 0 }}
                class="flex items-center gap-1"
              >
                view case
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </Motion.div>
            </div>
          </Motion.div>
        </A>
      </div>
    </div>
  )
}

export default Index
