import { Motion } from "solid-motionone"
import { spring } from "motion"
import { Show, createMemo, createSignal, onMount } from "solid-js"
import { A, useSearchParams } from "@solidjs/router"
import { useGrid } from "../components/grid"
import WorkTemplate, { Img, Sidebar } from "../components/work"
import works from "./works/index"

const Index = () => {
  const { setColor, hovering } = useGrid()

  const subtitles = [
    "empathy included !",
    "designer by heart, coder by means",
    "perfectionist for people's experiences",
    "obsessed with serving others",
    "thinking about how we think",
    "🧋❤️",
  ]
  const tags = works
    .flatMap(work => work.data.tags)
    .reduce(function (p, c) {
      p[c] = (p[c] || 0) + 1
      return p
    }, {})

  const [index, setIndex] = createSignal(0)
  const [params, setParams] = useSearchParams()
  const work = createMemo(() => works.find(w => w.data.name === params.work))

  onMount(() => {
    setColor(false)
  })
  return (
    <div class="flex flex-col lg:flex-row lg:p-16 lg:gap-16 items-stretch mx-auto">
      <div class="shrink-0 max-w-md w-full">
        <div class="lg:fixed h-[calc(100vh-8rem)] max-w-md w-full flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <div class="font-display text-5xl font-semibold">
              <Show
                when={work() || hovering()}
                fallback={
                  <button
                    onClick={() => setIndex((index() + 1) % subtitles.length)}
                  >
                    cysabi
                  </button>
                }
              >
                <div class="font-mono text-4xl">
                  {work()?.data?.name || hovering()?.name}
                </div>
              </Show>
            </div>
            <span class="font-display text-2xl text-primary font-semibold italic">
              <Show when={work() || hovering()} fallback={subtitles[index()]}>
                <span class="font-sans text-xl text-slate-400 font-normal not-italic">
                  {work()?.data?.desc || hovering()?.desc}
                </span>
              </Show>
            </span>
          </div>
          <Show when={!work()}>
            <div class="flex text-slate-300 flex-col gap-4 leading-relaxed">
              <Show
                when={hovering()}
                fallback={
                  <>
                    <p>
                      hi there! i'm a self-taught polymath that's obsessed with
                      designing experiences for people through code.
                    </p>
                    <p>
                      i always have an unapologetically holistic perspective to
                      the problems i set out to solve; code has been my
                      preferred means of bringing those solutions to life.
                    </p>
                    <p>
                      feel free to{" "}
                      <a
                        href="https://twitter.com/cysabi"
                        class="font-medium text-slate-50"
                      >
                        reach out
                      </a>
                      ! i'm always open to new opportunities, no matter the
                      medium.
                    </p>
                  </>
                }
              >
                {hovering()?.overview?.summary}
              </Show>
            </div>
          </Show>
          <Show when={work()}>
            <Sidebar toc={work().toc} />
          </Show>
          <div class="my-auto" />
          <div>tags</div>
          <div>roles</div>
          <div class="h-0.5 bg-primary/10 backdrop-blur backdrop-brightness-110" />
          <div class="flex gap-8 text-primary-200/60">
            <a
              href="https://github.com/cysabi"
              class="bg-primary/5 hover:scale-105 hover:bg-primary/15 hover:text-primary-100 backdrop-blur backdrop-brightness-125 transition-all rounded flex items-center p-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/cysabi"
              class="bg-primary/5 hover:scale-105 hover:bg-primary/15 hover:text-primary-100 backdrop-blur backdrop-brightness-125 transition-all rounded flex items-center p-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <A
              href="/"
              class="bg-primary/5 hover:scale-105 hover:bg-primary/15 hover:text-primary-100 backdrop-blur backdrop-brightness-125 transition-all rounded flex items-center px-3.5 no-underline font-medium ml-auto"
            >
              {work() ? "back home" : "show archives"}
            </A>
          </div>
        </div>
      </div>
      <div class="grow min-w-0 flex justify-center">
        <article
          class={`min-w-0 max-w-4xl prose-figure:my-0 ${work() && "mr-auto"}`}
        >
          <Show
            when={work()}
            fallback={
              <div class="grid gap-16 grid-cols-1 xl:grid-cols-2 not-prose">
                {works.map(work => (
                  <WorkPreview data={work.data} setParams={setParams} />
                ))}
              </div>
            }
          >
            <div class="min-h-screen pb-32 flex flex-col justify-between">
              <Show
                when={work().data.collage}
                fallback={
                  <div class="backdrop-blur backdrop-brightness-125 rounded-2xl p-2 overflow-clip bg-primary/10">
                    <img class="rounded-lg" src={work().data.previews[0]} />
                  </div>
                }
              >
                <Collage items={work().data.collage} />
              </Show>
              <div>{work()?.data?.overview?.summary}</div>
            </div>
            <div class="flex items-center gap-4 -mt-16 mb-16">
              <div class="flex-1 h-1 bg-slate-500 rounded-full" />
              <div class="font-medium text-2xl">case study</div>
              <div class="flex-1 h-1 bg-slate-500 rounded-full" />
            </div>
            <WorkTemplate {...work()} />
          </Show>
        </article>
      </div>
    </div>
  )
}

const WorkPreview = props => {
  const angle = Math.random() * Math.PI * 2
  const imgOffset = {
    x: Math.cos(angle) * 300,
    y: Math.sin(angle) * 300,
  }
  let ref
  const [lean, setLean] = createSignal({ img: imgOffset, orb: { x: 0, y: 0 } })
  const [hov, setHov] = createSignal()
  const { setHover } = useGrid()

  return (
    <Motion.button
      ref={ref}
      onClick={() => {
        setHover(false)
        props.setParams({ work: props.data.name })
        window.scrollTo(0, 0)
      }}
      onmouseenter={() => {
        setHover(props.data)
        setHov(true)
      }}
      onmouseleave={() => {
        setHover(false)
        setHov(false)
        setLean({ img: imgOffset, orb: { x: 0, y: 0 } })
      }}
      onmousemove={e => {
        const rect = ref.getBoundingClientRect()
        const x = (e.clientX - (rect.x + rect.width / 2)) / rect.width
        const y = (e.clientY - (rect.y + rect.height / 2)) / rect.height
        setLean({
          orb: {
            x: Math.sqrt(Math.abs(x)) * Math.sign(x) * 2,
            y: Math.sqrt(Math.abs(y)) * Math.sign(y) * 2,
          },
        })
      }}
      transition={{ easing: spring({ stiffness: 600, damping: 50 }) }}
      animate={{
        x: lean().orb.x * 12.5,
        y: lean().orb.y * 12.5,
        scale: hov() ? 1.05 : 1,
      }}
      class="relative backdrop-blur backdrop-brightness-125 rounded-2xl p-2 overflow-clip bg-primary/10"
    >
      <Motion.img
        animate={{
          opacity: hov() ? 0.1 : 1,
          "--tw-blur": hov() ? "blur(4px)" : "blur(0px)",
        }}
        class="rounded-lg filter"
        src={props.data.previews[0]}
      />
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hov() ? 1 : 0 }}
        class="absolute inset-0 flex flex-col p-4 gap-4 items-center justify-center"
      >
        <div class="flex items-center gap-2">
          <div class="font-mono text-4xl font-semibold">{props.data.name}</div>
        </div>
        <div class="flex items-center gap-1">
          has case!
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
        </div>
      </Motion.div>
    </Motion.button>
  )
}

const Collage = props => {
  const [active, setActive] = createSignal(0)

  const sources = Object.keys(props.items)
  const captions = Object.values(props.items)

  return (
    <figure>
      <div class="not-prose flex flex-col gap-1 overflow-clip bg-slate-600/50 border-4 border-transparent rounded-2xl backdrop-blur backdrop-brightness-125">
        <Img
          title="controls"
          class="rounded-md aspect-video object-cover object-top"
          src={sources[active()]}
        />
        <div class="flex gap-1 max-h-28 h-full justify-around">
          {sources.map((item, i) => (
            <button
              onClick={() => setActive(i)}
              class="flex flex-1 items-center justify-center rounded-md"
            >
              <Img
                title="controls"
                class={`pointer-events-none rounded-md object-cover object-center h-full ${
                  i === 0 && "rounded-bl-xl"
                } ${i === sources.length - 1 && "rounded-br-xl"} ${
                  sources[active()] === item
                    ? "outline outline-2 -outline-offset-2 outline-primary"
                    : ""
                }`}
                src={item}
              />
            </button>
          ))}
        </div>
      </div>
      <figcaption class="my-2">{captions[active()]}</figcaption>
    </figure>
  )
}

export default Index
