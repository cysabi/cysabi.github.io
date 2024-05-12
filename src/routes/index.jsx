import { Motion } from "solid-motionone"
import { spring } from "motion"
import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createSignal,
  onMount,
} from "solid-js"
import { useSearchParams } from "@solidjs/router"
import { useGrid } from "../components/layout"
import components, { Collage, topicsData } from "../components/work"
import works from "./works"

const hi = () => (
  <>
    <p>
      hi there ~ i'm a self-taught designer + hacker with a huge obsession for
      serving people!!
    </p>
    <p>
      feel free to{" "}
      <a href="https://twitter.com/cysabi" class="font-medium text-slate-50">
        reach out
      </a>
      ! i'm always open to new opportunities, no matter the medium
    </p>
  </>
)

const Index = () => {
  const { setColor, hovering } = useGrid()
  const [index, setIndex] = createSignal(0)

  const [params, setParams] = useSearchParams()
  const tags = () => new Set(params.tags?.split("-") || allTags)
  const topics = () => new Set(params.topics?.split("-") || allTopics)

  const toggleParam = (key, value) => {
    let newParams = new Set(params[key]?.split("-") || [])
    if (newParams.has(value)) {
      newParams.delete(value)
    } else {
      newParams.add(value)
    }
    let all
    if (key === "tags") {
      all = allTags
    } else if (key === "topics") {
      all = allTopics
    }
    setParams({
      [key]:
        all.length !== newParams.size ? Array.from(newParams).join("-") : null,
    })
  }

  const work = createMemo(() => works.find(w => w.data.name === params.work))
  onMount(() => {
    setColor(false)
  })
  return (
    <div class="flex flex-col p-4 gap-8 lg:flex-row lg:p-16 lg:gap-16 items-stretch mx-auto">
      <div class="shrink-0 lg:max-w-[30vw] xl:max-w-md w-full">
        <div class="lg:fixed lg:max-w-[30vw] lg:h-[calc(100vh-8rem)] xl:max-w-md w-full flex flex-col gap-8">
          <div class="flex flex-col gap-1">
            <div class="font-display text-5xl font-semibold">
              <button
                class="text-left"
                onClick={() =>
                  work()
                    ? setParams({ work: null })
                    : setIndex((index() + 1) % subtitles.length)
                }
              >
                <Show when={work()} fallback="cysabi">
                  <div class="font-mono tracking-tight text-3xl">
                    {work().data.name}
                  </div>
                  <div class="font-sans text-lg text-slate-400 font-medium">
                    {work().data?.subtitle}
                  </div>
                </Show>
              </button>
            </div>
            <Show when={!work()}>
              <div class="font-display text-2xl text-primary font-semibold">
                {subtitles[index()]}
              </div>
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
          <Show when={work()} fallback={hovering()?.desc || hi()}>
            <Show when={work()?.data?.sources}>
              <div class="flex flex-col gap-2">
                <div class="text-primary font-semibold">sources</div>
                <div class="flex gap-4">
                  <For each={Object.entries(work()?.data?.sources)}>
                    {source => (
                      <a
                        href={source[1]}
                        class="text-slate-300 text-xl hover:text-primary-50"
                      >
                        {source[0]}
                      </a>
                    )}
                  </For>
                </div>
              </div>
            </Show>
            <Show when={work()?.data?.tools}>
              <div class="flex flex-col gap-2">
                <div class="text-primary font-semibold">tools</div>
                <div class="flex gap-4">
                  <For each={work()?.data?.tools}>
                    {tool => (
                      <div class="text-slate-300 border-2 hover:text-primary-50">
                        {tool}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </Show>
            <Show when={work()?.data?.tags}>
              <div class="flex flex-col gap-2">
                <div class="text-primary font-semibold">tags</div>
                <div class="flex gap-4">
                  <For each={work()?.data?.tags}>
                    {tag => (
                      <div class="text-slate-300 border-2 hover:text-primary-50">
                        {tag}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </Show>
          <div class="hidden lg:block lg:my-auto" />
          <Show
            when={work()}
            fallback={
              <div class="hidden lg:flex gap-2 flex-wrap items-center">
                {allTags.map(tag => (
                  <button
                    onClick={() => toggleParam("tags", tag)}
                    class={`transition-all rounded line-through leading-none decoration-2 decoration-transparent py-1 px-2 text-xl font-medium bg-primary/10 text-primary hover:scale-105 backdrop-blur backdrop-brightness-125 ${
                      tags().has(tag) ||
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
            <Show when={work().toc.length}>
              <TableOfContents work={work} topics={topics} />
            </Show>
          </Show>
          <div class="shrink-0 h-0.5 bg-primary/10 backdrop-blur backdrop-brightness-110" />
          <div class="hidden lg:flex gap-4 flex-wrap">
            {Object.entries(topicsData).map(([key, val]) => (
              <button
                onClick={() => toggleParam("topics", key)}
                class={`px-2 hover:scale-105 gap-2 py-1.5 font-medium backdrop-blur decoration-2 decoration-transparent backdrop-brightness-125 flex items-center rounded transition-all ${
                  topics().has(key)
                    ? val.class
                    : "bg-primary/5 font-medium line-through text-slate-500 hover:text-slate-400 !decoration-slate-500 hover:!decoration-slate-400"
                }`}
              >
                <div
                  class={
                    topics().has(key)
                      ? "transition-colors"
                      : "transition-colors text-slate-500/65"
                  }
                >
                  {val.icon()}
                </div>
                {key}
              </button>
            ))}
            <button
              onClick={() => setParams({ work: null })}
              class="ml-auto bg-primary/15 hover:scale-105 hover:bg-primary/30 text-primary-200/80 hover:text-primary-100 backdrop-blur backdrop-brightness-125 transition-all rounded flex items-center px-3.5 no-underline font-medium"
            >
              <div class="min-h-9 flex items-center">
                {work() ? "back home" : "show archives"}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="grow flex justify-center">
        <article>
          <Show
            when={work()}
            fallback={
              <div class="grid gap-16 grid-cols-1 xl:grid-cols-2 not-prose">
                <For
                  each={works.filter(work =>
                    work.data.tags.some(tag => tags().has(tag))
                  )}
                >
                  {work => (
                    <WorkPreview data={work.data} setParams={setParams} />
                  )}
                </For>
              </div>
            }
          >
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
            {work().data.desc}
            {work().default({ components })}
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
        class="absolute inset-0 flex flex-col p-8 gap-4 items-center justify-center"
      >
        <div class="flex items-center gap-2">
          <div class="font-mono text-slate-50 text-3xl font-semibold tracking-tight">
            {props.data.name}
          </div>
        </div>
        <span class="font-sans leading-normal text-slate-300">
          {props.data?.subtitle}
        </span>
      </Motion.div>
    </Motion.button>
  )
}

const TableOfContents = props => {
  // watch heading active state
  const [active, setActive] = createSignal({})
  const activeHeading = createMemo(() => {
    const entries = Object.entries(active()).filter(([k, v]) => v)
    if (entries.length > 0) {
      return entries.at(-1)?.[0]
    } else {
      return props.work().toc[0]?.id
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
    props
      .work()
      .toc.forEach(h => headingObserver.observe(document.getElementById(h.id)))
  )

  createEffect(() => console.log(props.topics()))

  const onClick = h =>
    document.getElementById(h.id).scrollIntoView({ behavior: "smooth" })
  const padding = h => (h.depth - 1) * 16
  const header = h => h.value.split(" # ")

  return (
    <div class="flex flex-col gap-2">
      <div class="text-primary font-semibold text-base">table of contents</div>
      <div class="flex items-stretch">
        <div class="mx-2 w-0.5 bg-primary/50 rounded-full" />
        <div class="gap-2 p-2 flex flex-col">
          {props
            .work()
            .toc.flatMap(h =>
              h.children ? [h, ...h.children].filter(h => h.depth < 3) : h
            )
            .map(h => (
              <button
                onclick={() => onClick(h)}
                class={`font-medium text-left no-underline leading-tight ${
                  padding(h) ? "text-base" : "text-lg"
                } ${
                  activeHeading() === h.id
                    ? "text-slate-50 font-semibold tracking-[-0.01em]"
                    : "text-slate-400"
                } ${
                  header(h).length > 1 && !props.topics().has(header(h).at(0))
                    ? "text-slate-600 pointer-events-none"
                    : "hover:text-slate-300"
                }`}
                style={`padding-left: ${padding(h)}px`}
              >
                <span class="line-clamp-2">{header(h).at(-1)}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

const _countedTags = works
  .flatMap(work => work.data.tags)
  .reduce((p, c) => {
    p[c] = (p[c] || 0) + 1
    return p
  }, {})
const allTags = Object.keys(_countedTags).sort(
  (a, b) => _countedTags[b] > _countedTags[a]
)

const allTopics = Object.keys(topicsData)

const subtitles = [
  "empathy included !",
  <>
    <span class="transition-all delay-500 duration-500 hover:delay-0 hover:duration-0 hover:text-[#faf378]">
      aro
    </span>{" "}
    <span class="transition-all delay-500 duration-500 hover:delay-0 hover:duration-0 hover:text-slate-200">
      ace
    </span>{" "}
    <span class="transition-all delay-500 duration-500 hover:delay-0 hover:duration-0 hover:text-[#b270e9]">
      any
    </span>
  </>,
  <span class="lg:whitespace-nowrap">
    sorry in advance for missing that social cue
  </span>,
  "🧋❤️",
]

export default Index
