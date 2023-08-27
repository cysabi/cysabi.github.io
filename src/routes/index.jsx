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
  let worksRef
  const location = useLocation()

  const subtitles = [
    "born to design, lead to develop",
    "a software engineer that's capable of empathy",
    "thinking about people thinking",
    "a perfectionist for serving others",
    "focused on sporadic projects",
    "comp sci's biggest hater",
    "🧋❤️",
  ]
  const [index, setIndex] = createSignal(0)
  const [hoverSlurk, setHoverSlurk] = createSignal(false)

  return (
    <div class="flex flex-col justify-between max-w-7xl h-screen mx-auto p-[min(10vw,128px)]">
      <div class="flex flex-col flex-1">
        <div class="flex flex-col-reverse items-start gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div>
            <div class="text-4xl lg:text-5xl">hey, i'm cysabi</div>
            <div class="text-slate-300 text-3xl lg:text-4xl">
              {subtitles[index()]}
            </div>
            <div class="flex pt-12 gap-8 text-2xl flex-wrap">
              <A href="#works" onClick={() => worksRef.scrollIntoView(true)}>
                works
              </A>
              <A
                href={location.hash === "#contact" ? "/" : "#contact"}
                noScroll
              >
                contact
              </A>
              {/* <A href="#works">works</A> */}
            </div>
          </div>
          <button onClick={() => setIndex((index() + 1) % subtitles.length)}>
            <Motion.img
              onmouseenter={() => setHoverSlurk(true)}
              onmouseleave={() => setHoverSlurk(false)}
              animate={{
                scale: hoverSlurk() ? 1.1 : 1,
                rotate: hoverSlurk() ? 2 : 0,
              }}
              transition={{ easing: spring({ mass: 0.5, stiffness: 300 }) }}
              src={slurk}
              class="h-28 md:h-32 lg:h-48"
            />
          </button>
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
                  class="absolute flex flex-col gap-6 rounded-2xl text-2xl text-slate-300"
                >
                  <div>
                    hi, thanks for stopping by! ~ i have a huge passion for{" "}
                    <span class="font-medium text-slate-50">
                      learning the ways people think
                    </span>
                    , and using that info to{" "}
                    <span class="font-medium text-slate-50">
                      think about how best to serve them
                    </span>
                    .
                  </div>
                  <div>
                    i got my start in the competitive Splatoon community, where
                    i first learned to build everything from discord bots, to
                    websites, to broadcast graphics.
                  </div>
                  <div>
                    <span class="font-medium text-slate-50">
                      it's never the role i'm filling, but the people i'm
                      serving that excites me the most!
                    </span>{" "}
                    if you're looking for something specific in my works, i've
                    given you some tags to filter by for help!
                  </div>
                  <div>
                    i'm always open to new opportunities, no matter the medium!
                    so if you like what you see and want to work with me, don't
                    hesitate to{" "}
                    <A href="/#contact" class="font-medium text-slate-50">
                      reach out!
                    </A>
                  </div>
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
        <h2 class="font-medium text-xl" id="works" ref={worksRef}>
          selected works below
        </h2>
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
      class="absolute h-full w-full flex flex-col"
    >
      <form
        ref={formRef}
        class="flex flex-col gap-4 h-full text-slate-300"
        target="dummyframe"
        method="POST"
        action="https://formsubmit.io/send/leptoflare@gmail.com"
        onsubmit={() => setDone(true)}
      >
        <div class="text-2xl">
          like what you see? got something in mind? let's talk!
        </div>
        <div class="flex gap-4 flex-col md:flex-row">
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
        </div>
        <textarea
          class="resize-none flex-1"
          placeholder={`hey ${
            talk() || "there"
          }! what would you like to share with me?`}
          name="comment"
          required
        ></textarea>
        <div class="flex justify-start">
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
        </div>
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
    <div class="flex h-[calc(100vh-19rem)] -mb-32">
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
        <Motion.a
          href={"works/" + props.name}
          onmouseenter={() => {
            setHov(true)
            setColor("#a0cebe")
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
          animate={{
            x: lean().orb.x,
            y: lean().orb.y,
            scale: hov() ? 1.2 : 1,
            backgroundColor: hov()
              ? "rgb(51 65 85 / 0.5)"
              : "rgb(15 23 42 / 0.5)",
            borderColor: hov() ? "rgb(71 85 105 / 0.5)" : "rgb(51 65 85 / 0.5)",
          }}
          transition={{
            easing: spring({ stiffness: 500, damping: 50 }),
          }}
          class="rounded-full h-full w-full flex items-center justify-center backdrop-blur transition-none"
          style={`border-width: ${4 / scale}px`}
        >
          <div class="absolute inset-0 p-6 rounded-full flex items-center justify-center">
            <Motion.div
              ref={titleRef}
              animate={{
                scale: hov() ? 0.75 : 1,
                y: hov() ? (titleHeight() - size / 2) * scale - 12 : 0,
              }}
              class="flex flex-col items-center text-center origin-top"
            >
              <div class="flex items-center justify-center gap-2 text-lg">
                {props.tags?.slice(0, 2)?.map(tag => (
                  <div class="px-3 py-1 bg-primary/10 font-medium text-3xl rounded-full text-primary backdrop-blur backdrop-brightness-125">
                    {tag}
                  </div>
                ))}
              </div>
              <div class="font-mono leading-tight text-4xl">{props.name}</div>
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
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Motion.div>
          </div>
        </Motion.a>
      </div>
    </div>
  )
}

export default Index
