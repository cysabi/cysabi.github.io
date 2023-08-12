import { createSignal } from "solid-js"
import { Motion } from "@motionone/solid"
import { spring } from "motion"
import { useGrid } from "../components/grid"
import { works } from "./works/index"
import slurk from "../static/slurk.png"
import { A, useLocation } from "@solidjs/router"

const Index = () => (
  <>
    <LandingScreen />
    <SelectedWorksScreen />
  </>
)

const LandingScreen = () => {
  const location = useLocation()

  const [hoverSlurk, setHoverSlurk] = createSignal(false)

  return (
    <div class="flex flex-col justify-between max-w-7xl h-screen mx-auto p-[min(10vw,128px)]">
      <div class="flex-1">
        <div class="flex flex-col-reverse items-start gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div>
            <div class="text-4xl lg:text-5xl">hey, i'm cerusabi</div>
            <div class="text-3xl lg:text-4xl">
              born to design, forced to develop
            </div>
            <div class="flex pt-12 gap-8 text-2xl flex-wrap">
              <A
                href={location.hash === "#about" ? "/" : "#about"}
                class="underline decoration-2 decoration-transparent hover:decoration-slate-400 transition-colors"
              >
                about
              </A>
              <A
                href="/works"
                class="underline decoration-2 decoration-transparent hover:decoration-slate-400 transition-colors"
              >
                works
              </A>
            </div>
          </div>
          <A href={location.hash === "#about" ? "/" : "#about"}>
            <Motion.img
              onmouseenter={e => setHoverSlurk(true)}
              onmouseleave={e => setHoverSlurk(false)}
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
        <Motion.div
          initial={false}
          animate={{
            opacity: location.hash === "#about" ? 1 : 0,
            scale: location.hash === "#about" ? 1 : 0.95,
          }}
          transition={{
            easing: spring({ mass: 0.1 }),
          }}
          class="pt-12 origin-top-right"
        >
          <div
            style={location.hash === "#about" ? "" : "pointer-events: none"}
            class="flex flex-col gap-10 rounded-2xl p-10 text-xl relative bg-gray-800/50 border-4 border-gray-700/25 backdrop-blur-3xl"
          >
            <div>
              hi, thanks for stopping by! you can call me{" "}
              <span class="font-medium">sabi</span>; i love thinking about
              people thinking.
            </div>
            <div>
              this is a portfolio of different works i've done! i don't tend to
              stick to one thing, so the collection is a bit random. to help, if
              you hit the{" "}
              <A
                href="/works"
                class="underline decoration-2 decoration-slate-400 hover:decoration-transparent transition-colors"
              >
                works
              </A>{" "}
              link, i've given you some tags to filter by.
            </div>
            <div>
              i'm always open to new opportunities, no matter the medium! so if
              you like what you see and want to work with me, don't hesitate to
              reach out!
            </div>
          </div>
        </Motion.div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
        <div class="font-medium">selected works below</div>
        <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
      </div>
    </div>
  )
}

const SelectedWorksScreen = () => (
  <div class="flex max-w-7xl mx-auto h-screen px-[min(calc(10vw,128px)]">
    <div class="w-full h-full grid grid-cols-12 grid-rows-6">
      <ProjectOrb
        wip={true}
        layer="2"
        coords={[2, 1]}
        name="off-the-dial-bot"
      />
      <ProjectOrb wip={true} layer="2" coords={[10, 3]} name="blurple.py" />
      <ProjectOrb wip={true} layer="2" coords={[5, 5]} name="radia" />
      <ProjectOrb wip={true} layer="3" coords={[4, 3]} name="cg-offthedial" />
      <ProjectOrb
        wip={true}
        layer="3"
        coords={[8, 2]}
        name="social-scheduler"
      />
      <ProjectOrb wip={true} layer="3" coords={[2, 4]} name="fabl-website" />
      <ProjectOrb
        wip={true}
        layer="3"
        coords={[7, 5]}
        name="cg-pass-the-clam"
      />
      <ProjectOrb wip={true} layer="4" coords={[4, 1]} name="cg-fabl" />
      <ProjectOrb wip={true} layer="4" coords={[9, 4]} name="cq-overlays" />
      {works
        .filter(work => work.data.layer)
        .map(work => (
          <ProjectOrb {...work.data} />
        ))}
    </div>
  </div>
)

const ProjectOrb = props => {
  let ref
  const { setColor } = useGrid()
  const [y, setY] = createSignal(0)
  const [pos, setPos] = createSignal([0, 0])
  const [lean, setLean] = createSignal([0, 0])
  addEventListener("scroll", () => {
    let translate =
      ref.getBoundingClientRect().top -
      window.innerHeight / 2 -
      getComputedStyle(ref).getPropertyValue("--motion-translateY").slice(0, -2)
    setY((translate / 1.75) * props.layer - translate)
  })
  const [hov, setHov] = createSignal(false)

  const angle = Math.random() * Math.PI * 2
  const previewX = Math.cos(angle) * props.layer * 64
  const previewY = Math.sin(angle) * props.layer * 64
  const rotate =
    (4 + Math.floor(Math.random() * 4)) * Math.sign(Math.random() - 0.5)

  const Link = p =>
    props.wip ? (
      <div>{p.children}</div>
    ) : (
      <A href={"/works/" + props.name}>{p.children}</A>
    )

  return (
    <div
      class={`${hov() ? "z-20" : ""}`}
      style={`grid-column-start: ${props.coords[0]}; grid-row-start: ${props.coords[1]};`}
    >
      <Motion.div
        ref={ref}
        animate={{ y: y() }}
        style={`height: ${props.layer * 64}px; width: ${props.layer * 64}px;`}
        transition={{ duration: 0 }}
      >
        <div class="z-10 absolute pointer-events-none">
          <Motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: hov() ? 1 : 0,
              x: pos()[0] / 8 + previewX,
              y: pos()[1] / 8 + previewY,
            }}
            transition={{
              easing: spring({ mass: 0.3, stiffness: 25 }),
            }}
          >
            <img
              class="rounded"
              style={`transform: rotate(${rotate}deg)`}
              src={props.previews?.[0]}
            />
          </Motion.div>
        </div>
        <Motion.div
          onmouseenter={() => {
            setHov(true)
            setColor("#a0cebe")
          }}
          onmousemove={e => {
            const rect = ref.getBoundingClientRect()
            let [x, y] = [
              e.clientX - (rect.x + rect.width / 2),
              e.clientY - (rect.y + rect.height / 2),
            ]
            setPos([x, y])
            ;[x, y] = [
              Math.sqrt(Math.abs(x)) * Math.sign(x) * 3,
              Math.sqrt(Math.abs(y)) * Math.sign(y) * 3,
            ]
            setLean([x, y])
          }}
          onmouseleave={() => {
            setHov(false)
            setColor(false)
            setLean([0, 0])
          }}
          href={"works/" + props.name}
          style={`font-size: calc(2rem / 5 * ${props.layer})`}
          animate={{
            x: lean()[0] / 2,
            y: lean()[1] / 2,
            scale: hov() ? 1.15 : 1,
            backgroundColor: hov() ? "rgb(100 116 139 / 0.25)" : "transparent",
          }}
          transition={{
            easing: spring({ stiffness: 500, damping: 50 }),
          }}
          class="rounded-full h-full w-full flex items-center justify-center border-4 border-slate-500 backdrop-blur-3xl"
        >
          <Link>
            <div class="absolute inset-0 rounded-full flex items-center justify-center">
              <Motion.div
                animate={{
                  scale: hov() ? 0.75 : 1,
                  y: hov() ? props.layer * 15 * -1 : 0,
                }}
                class="flex flex-col items-center text-center p-3 origin-top"
              >
                <div
                  class="text-[#acc9eb] font-semibold"
                  style={`font-size: calc(1.2rem / 5 * ${props.layer})`}
                >
                  {props.tags?.[0]}
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
          </Link>
        </Motion.div>
      </Motion.div>
    </div>
  )
}

export default Index
