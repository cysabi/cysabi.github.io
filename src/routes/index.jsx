import { Motion } from "solid-motionone"
import { spring } from "motion"
import { Show, createMemo, createSignal, onMount } from "solid-js"
import { A, useSearchParams } from "@solidjs/router"
import { useGrid } from "../components/layout"
import WorkTemplate, { Collage, topics } from "../components/work"
import works from "./works/index"

const subtitles = [
  "empathy included !",
  <span>
    <span class="text-[#faf378]">aro</span>{" "}
    <span class="text-slate-300">ace</span>{" "}
    <span class="text-[#b270e9]">any</span>
  </span>,
  <span class="text-lg">sorry in advance for missing that social cue</span>,
  "🧋❤️",
]
const tagCount = works
  .flatMap(work => work.data.tags)
  .reduce((p, c) => {
    p[c] = (p[c] || 0) + 1
    return p
  }, {})
const tags = Object.keys(tagCount).sort((a, b) => tagCount[b] > tagCount[a])

const Index = () => {
  const { setColor, hovering } = useGrid()
  const [index, setIndex] = createSignal(0)
  const [params, setParams] = useSearchParams()
  const work = createMemo(() => works.find(w => w.data.name === params.work))
  const filters = createMemo(() => new Set(params.tags?.split("-") || tags))

  onMount(() => {
    setColor(false)
  })
  return (
    <div class="flex flex-col lg:flex-row lg:p-16 lg:gap-16 items-stretch mx-auto lowercase">
      <div class="shrink-0 max-w-md w-full">
        <div class="lg:fixed h-[calc(100vh-8rem)] max-w-md w-full flex flex-col gap-8">
          <div class="flex flex-col gap-1">
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
            <span class="font-display text-2xl text-primary font-semibold">
              <Show when={work() || hovering()} fallback={subtitles[index()]}>
                <span class="font-sans text-xl text-slate-400 font-normal">
                  {work()?.data?.desc || hovering()?.desc}
                </span>
              </Show>
            </span>
            <Show when={!work() && !hovering()}>
              <div class="mt-4 flex gap-4 text-xl font-medium text-slate-400">
                <a
                  href="https://github.com/cysabi"
                  class="hover:text-primary-50"
                >
                  github
                </a>
                <a
                  href="https://twitter.com/cysabi"
                  class="hover:text-primary-50"
                >
                  twitter
                </a>
              </div>
            </Show>
          </div>
          <Show when={!work()}>
            <div class="flex flex-col gap-4 text-slate-300 leading-relaxed">
              <Show
                when={hovering()}
                fallback={
                  <>
                    <p>
                      hi there ~ i'm a self-taught designer + hacker with a huge
                      obsession for serving people!
                    </p>
                    <p>
                      in splatoon, i'm a day 1 kglues one-trick, and i always
                      make sure to die with my special up!
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
                      medium
                    </p>
                  </>
                }
              >
                {hovering()?.overview?.summary}
              </Show>
            </div>
          </Show>
          <div class="my-auto" />
          <Show
            when={work()}
            fallback={
              <div class="flex gap-2 flex-wrap items-center">
                {tags.map(tag => (
                  <button
                    onClick={() => {
                      let newFilters = new Set(params.tags?.split("-") || [])
                      if (newFilters.has(tag)) {
                        newFilters.delete(tag)
                      } else {
                        newFilters.add(tag)
                      }
                      setParams({
                        tags:
                          tags.length !== newFilters.size
                            ? Array.from(newFilters).join("-")
                            : null,
                      })
                    }}
                    class={`transition-all rounded line-through leading-none decoration-2 decoration-transparent py-1 px-2 text-xl font-medium bg-primary/10 text-primary hover:scale-105 backdrop-blur backdrop-brightness-125 ${
                      filters().has(tag) ||
                      "bg-transparent text-slate-500 hover:text-slate-400 !decoration-slate-500 hover:!decoration-slate-400"
                    } ${
                      hovering() &&
                      !hovering()?.tags?.includes(tag) &&
                      "blur-[2px] opacity-50"
                    }`}
                  >
                    <div class="-translate-y-[1px]">{tag}</div>
                  </button>
                ))}
              </div>
            }
          >
            <Sidebar toc={work().toc} />
          </Show>
          <div class="shrink-0 h-0.5 bg-primary/10 backdrop-blur backdrop-brightness-110" />
          <div class="flex gap-4 text-primary-200/60">
            {Object.entries(topics).map(([topic, stuff]) => (
              <div
                class={`px-2 gap-2 py-1.5 font-medium backdrop-blur backdrop-brightness-125 flex items-center rounded ${stuff.class}`}
              >
                {stuff.icon}
                {topic}
              </div>
            ))}
            <button
              onClick={() => setParams({ work: null })}
              class="ml-auto bg-primary/5 hover:scale-105 hover:bg-primary/15 hover:text-primary-100 backdrop-blur backdrop-brightness-125 transition-all rounded flex items-center px-3.5 no-underline font-medium"
            >
              {work() ? "back home" : "show archives"}
            </button>
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
                <For
                  each={works.filter(work =>
                    work.data.tags.some(tag => filters().has(tag))
                  )}
                >
                  {work => (
                    <WorkPreview data={work.data} setParams={setParams} />
                  )}
                </For>
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

const Sidebar = props => {
  // build table of contents
  const toc = props.toc.flatMap(h => {
    if (h.children) {
      return [h, ...h.children].filter(h => h.depth < 3)
    } else {
      return h
    }
  })

  // watch heading active state
  const { hiddenTopics } = useGrid()
  const [active, setActive] = createSignal({})
  const activeHeading = createMemo(() => {
    const entries = Object.entries(active()).filter(([k, v]) => v)
    if (entries.length > 0) {
      return entries.at(-1)?.[0]
    } else {
      return props.toc[0]?.id
    }
  })
  const headingObserver = new IntersectionObserver(
    entries =>
      entries.forEach(entry =>
        setActive({
          ...active(),
          [entry.target.id]:
            entry.isIntersecting || entry.boundingClientRect.y < 0
              ? entry
              : false,
        })
      ),
    { rootMargin: "0px 0px -50% 0px" }
  )
  onMount(() =>
    toc.forEach(h => headingObserver.observe(document.getElementById(h.id)))
  )

  return (
    <div class="flex flex-col gap-12 pt-12 w-full">
      <Section title="Table of Contents">
        {toc.map(h => (
          <button
            onclick={() =>
              document
                .getElementById(h.id)
                .scrollIntoView({ behavior: "smooth" })
            }
            class={`text-left no-underline leading-tight ${
              (h.depth - 1) * 16 ? "text-base" : "text-lg"
            } ${
              activeHeading() === h.id
                ? "text-slate-50 font-semibold tracking-[-0.015em]"
                : "text-slate-400"
            } ${
              hiddenTopics().includes(h.value.split(" # ").at(0))
                ? "text-slate-600 pointer-events-none"
                : "hover:text-slate-200"
            }`}
            style={`padding-left: ${(h.depth - 1) * 16}px`}
          >
            <span class="line-clamp-2">{h.value.split(" # ").at(-1)}</span>
          </button>
        ))}
      </Section>
    </div>
  )
}

const Section = props => (
  <div class="flex flex-col gap-5">
    <h2 class="text-2xl font-semibold font-display">{props.title}</h2>
    <div class="flex flex-col gap-2">{props.children}</div>
    {props.extra}
  </div>
)

export default Index
