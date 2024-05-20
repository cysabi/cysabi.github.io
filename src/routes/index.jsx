import { Motion } from "solid-motionone"
import { spring } from "motion"
import {
  For,
  Show,
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
      hi there ~ i'm a self-taught designer + hacker that loves thinking about
      experiences!! i'm always looking to explore better ways to care for
      people, through tinkering with technology and making new things.
    </p>
    {/* <p>
      i'm an advocate for making broadcast graphics with code, which allows them
      to be much more capable, flexible and easier to control!
      currently, im exploring how to make esports broadcast graphics more flexible and easier to control through code!
    </p> */}
    <p>
      i like boba, fizzy boba especially. in splatoon, i'm a day-one kglues
      one-trick, and i always make sure to die with my special up!
    </p>
    <p>
      feel free to{" "}
      <a
        href="https://twitter.com/messages/compose?recipient_id=1178483825950822401"
        class="font-medium text-slate-50"
      >
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

  const filteredWorks = createMemo(() =>
    works
      .filter(work => work.data.tags.some(tag => tags().has(tag)))
      .filter(work => !work.data.archive || params.archives)
  )

  const work = createMemo(() => works.find(w => w.data.name === params.work))
  onMount(() => {
    setColor(false)
  })

  return (
    <div class="flex flex-col p-4 gap-8 lg:flex-row lg:p-16 lg:gap-16 items-stretch mx-auto">
      <div class="shrink-0 lg:max-w-[30vw] xl:max-w-md w-full">
        <div class="lg:fixed lg:max-w-[30vw] lg:h-[calc(100vh-8rem)] xl:max-w-md w-full flex flex-col gap-8">
          <Show
            when={work()}
            fallback={
              <>
                <div class="flex flex-col gap-1 font-display text-5xl font-semibold">
                  <button
                    class="flex flex-col gap-2 w-fit"
                    onClick={() => setIndex((index() + 1) % subtitles.length)}
                  >
                    cysabi
                  </button>
                  <div class="text-2xl text-primary">{subtitles[index()]}</div>
                  <div class="mt-4 flex gap-4 text-xl font-medium text-slate-300">
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
                </div>
                <div class="flex flex-col gap-4 text-slate-300 leading-relaxed">
                  {hovering()?.desc || hi()}
                </div>
                <div class="hidden lg:block lg:my-auto" />
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
              </>
            }
          >
            <div class="flex flex-col gap-2 font-display text-5xl font-semibold">
              <div class="font-mono tracking-tight text-3xl">
                {work().data.name}
              </div>
              <div class="flex flex-wrap gap-2 ml-[-3px] text-xl leading-none font-medium">
                <For each={work()?.data?.tags}>
                  {tag => (
                    <div class="rounded py-1 px-1.5 bg-primary/10 text-primary backdrop-blur backdrop-brightness-125">
                      {tag}
                    </div>
                  )}
                </For>
              </div>
              <div class="font-sans text-xl text-slate-400 font-medium">
                {work().data?.subtitle}
              </div>
              <div class="flex flex-col gap-1 text-slate-300 leading-relaxed">
                <Show when={work()?.data?.sources}>
                  <div class="flex gap-4 font-medium">
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
                </Show>
              </div>
            </div>
            <TableOfContents work={work} topics={topics} />
            <div class="hidden lg:block lg:my-auto" />
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
              onClick={() =>
                work()
                  ? setParams({ work: null })
                  : setParams({ archives: params.archives ? null : true })
              }
              class="ml-auto bg-primary/15 hover:scale-105 hover:bg-primary/30 text-primary-200/80 hover:text-primary-100 backdrop-blur backdrop-brightness-125 transition-all rounded flex items-center px-3.5 no-underline font-medium"
            >
              <div class="min-h-9 flex items-center">
                {work() ? (
                  "back home"
                ) : (
                  <>{params.archives ? "hide" : "show"} archives</>
                )}
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
                <For each={filteredWorks()}>
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
  const toc = createMemo(() =>
    props
      .work()
      .toc.flatMap(h =>
        h.children ? [h, ...h.children].filter(h => h.depth < 3) : h
      )
  )
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
    toc().forEach(h => headingObserver.observe(document.getElementById(h.id)))
  )

  createEffect(() => console.log(props.topics()))

  const onClick = h =>
    document.getElementById(h.id).scrollIntoView({ behavior: "smooth" })
  const header = h => h.value.split(" # ")
  const activeHeading = () =>
    Object.entries(active())
      .filter(h => h[1])
      .at(-1)?.[0]

  return (
    <Show when={props.work().toc.length}>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-4">
          {activeHeading() ? (
            <>
              <div class="text-slate-500 font-semibold text-base">summary</div>
              <div class="border-t-2 border-dotted grow border-slate-600 mt-0.5" />
              <div class="text-primary font-semibold text-base">
                table of contents
              </div>
            </>
          ) : (
            <>
              <div class="text-primary font-semibold text-base">summary</div>
              <div class="border-t-2 border-dotted grow border-slate-600 mt-0.5" />
              <div class="text-slate-500 font-semibold text-base">
                table of contents
              </div>
            </>
          )}
        </div>
        <div class="flex items-stretch">
          <div class="flex flex-col items-end w-full -my-1">
            {activeHeading() ? (
              toc().map(h => (
                <button
                  onclick={() => onClick(h)}
                  class={`no-underline py-1 leading-tight ${
                    h.depth > 1
                      ? "text-base pr-2 border-r-2 border-slate-700"
                      : "text-lg"
                  } ${
                    activeHeading() === h.id
                      ? "text-slate-50 font-medium tracking-[-0.0095em]"
                      : "text-slate-400"
                  } ${
                    header(h).length > 1 && !props.topics().has(header(h).at(0))
                      ? "text-slate-600 pointer-events-none"
                      : "hover:text-slate-300"
                  }`}
                >
                  <span class="line-clamp-2">{header(h).at(-1)}</span>
                </button>
              ))
            ) : (
              <div class="mt-1 flex flex-col gap-4 text-slate-300 leading-relaxed">
                {props.work().data.desc}
                <div class="flex items-baseline flex-wrap gap-2 pt-2 ml-[-3px] leading-none font-medium text-base">
                  <For each={props.work()?.data?.tools}>
                    {tool => (
                      <div class="text-slate-400 backdrop-blur backdrop-brightness-125 rounded flex px-2 py-1">
                        {tool}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Show>
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
