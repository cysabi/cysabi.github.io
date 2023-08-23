import { createMemo, createSignal, onMount } from "solid-js"
import { Motion, Presence } from "@motionone/solid"
import { spring } from "motion"
import { useGrid } from "../components/grid"
import { works } from "./works/index"
import slurk from "../static/slurk.png"
import { A, useLocation } from "@solidjs/router"

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

  const [hoverSlurk, setHoverSlurk] = createSignal(false)

  return (
    <div class="flex flex-col justify-between max-w-7xl h-screen mx-auto p-[min(10vw,128px)]">
      <div class="flex flex-col flex-1">
        <div class="flex flex-col-reverse items-start gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div>
            <div class="text-4xl lg:text-5xl">hey, i'm cysabi~</div>
            <div class="text-slate-300 text-3xl lg:text-4xl">
              born to design, forced to develop
            </div>
            <div class="flex pt-12 gap-8 text-2xl flex-wrap">
              <A href={location.hash === "#about" ? "/" : "#about"} noScroll>
                about
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
          <A href="#about" noScroll>
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
          </A>
        </div>
        <div class="relative my-12 md:my-16 flex-1 max-h-full">
          <Presence>
            <Switch>
              <Match when={location.hash === "#about"}>
                <About />
              </Match>
              <Match when={location.hash === "#contact"}>
                <Contact />
              </Match>
            </Switch>
          </Presence>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
        <div class="font-medium text-xl">selected works below</div>
        <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
      </div>
    </div>
  )
}

const About = () => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      easing: spring({ mass: 0.1 }),
    }}
    class="absolute flex flex-col gap-10 rounded-2xl p-4 md:p-8 text-lg md:text-xl bg-slate-900/50 border-4 border-slate-700/25 backdrop-blur"
  >
    <div>
      hi, thanks for stopping by! you can call me{" "}
      <span class="font-semibold">sabi</span>; i love thinking about people
      thinking.
    </div>
    <div>
      this is a portfolio of different works i've done! i don't tend to stick to
      one thing, so the collection is a bit random. eventually, i'll have some
      tags to filter by.
    </div>
    <div>
      i'm always open to new opportunities, no matter the medium! so if you like
      what you see and want to work with me, don't hesitate to{" "}
      <A href="/#contact" class="font-semibold">
        reach out!
      </A>
    </div>
  </Motion.div>
)

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
          like what you see? got a project in mind? let's talk!
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
          placeholder={`hey ${talk() || "there"}! what would you like to say?`}
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
    <div class="flex h-[calc(100vh-8rem)] -mb-32">
      <div class="w-full h-full grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))]">
        {works
          .filter(work => work.data.layer)
          .map(work => (
            <ProjectOrb {...work.data} scrollY={scrollY} />
          ))}
      </div>
    </div>
  )
}

const ProjectOrb = props => {
  let ref, top
  const { setColor } = useGrid()

  onMount(() => {
    top = ref.getBoundingClientRect().top + window.scrollY
  })
  const y = createMemo(() => {
    const translate = top / 2 - props.scrollY()
    return (translate / 1.5) * props.layer - translate
  })

  const angle = Math.random() * Math.PI * 2
  const imgOffset = {
    x: Math.cos(angle) * props.layer * 64,
    y: Math.sin(angle) * props.layer * 64,
  }

  const [lean, setLean] = createSignal({ img: imgOffset, orb: { x: 0, y: 0 } })
  const [hov, setHov] = createSignal(false)

  return (
    <div
      style={`z-index: ${hov() ? "20" : props.layer}; grid-column-start: ${
        props.coords[0]
      }; grid-row-start: ${props.coords[1]};`}
    >
      <div
        ref={ref}
        class="ml-[50%]"
        style={`
          transform: translate(-50%, ${y()}px);
          height: ${props.layer * 64}px;
          width: ${props.layer * 64}px;
          font-size: calc(2rem / 5 * ${props.layer});
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
        <Motion.button
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
          href={"works/" + props.name}
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
          class="rounded-full h-full w-full flex items-center justify-center border-4 backdrop-blur"
        >
          <div class="absolute inset-0 rounded-full flex items-center justify-center">
            <Motion.div
              animate={{
                scale: hov() ? 0.75 : 1,
                y: hov() ? props.layer * 15 * -1 : 0,
              }}
              class="flex flex-col items-center text-center p-3 origin-top"
            >
              <div
                class="flex items-center justify-center"
                style={`font-size: calc(1.2rem / 5 * ${props.layer}); gap: calc(0.4rem / 5 * ${props.layer})`}
              >
                {props.tags?.slice(0, 2)?.map(tag => (
                  <div
                    style={`padding: 0 calc(0.5rem / 5 * ${props.layer}) 0 calc(0.5rem / 5 * ${props.layer})`}
                    class="px-2 bg-primary/10 font-medium rounded-full text-primary backdrop-blur backdrop-brightness-125"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div class="font-mono leading-tight">{props.name}</div>
            </Motion.div>
          </div>
          <div class="absolute inset-0 rounded-full flex flex-col items-center justify-center">
            <div style={`height: ${props.layer * 20}px`} />
            <Motion.div
              animate={{
                opacity: hov() ? 1 : 0,
              }}
              class="p-3 opacity-0 mx-auto text-center my-auto"
              style={`font-size: calc(1.2rem / 5 * ${props.layer})`}
            >
              {props.desc || (
                <span class="font-bold text-slate-400">coming soon!</span>
              )}
            </Motion.div>
            {props.desc && (
              <Motion.div
                animate={{
                  opacity: hov() ? 1 : 0,
                }}
                class="p-3 opacity-0 mx-auto text-center my-auto font-medium flex items-center gap-1"
                style={`font-size: calc(1rem / 5 * ${props.layer})`}
              >
                view case
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={`height: calc(1.5rem / 5 * ${props.layer})`}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Motion.div>
            )}
          </div>
        </Motion.button>
      </div>
    </div>
  )
}

export default Index
