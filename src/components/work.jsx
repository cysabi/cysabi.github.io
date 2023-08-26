import { A } from "@solidjs/router"
import { Match, Switch, createMemo, createSignal, onMount } from "solid-js"
import { useGrid } from "./grid"

const WorkTemplate = props => {
  const { setColor } = useGrid()
  onMount(() => {
    setColor("#59786b")
  })

  return (
    <div class="mx-auto gap-8 max-w-7xl px-[min(10vw,64px)]">
      <div class="flex flex-col gap-4 w-full items-center text-center py-16">
        <div class="text-4xl font-semibold font-mono">{props.data.name}</div>
        <div class="text-2xl">{props.data.desc}</div>
        <div class="flex gap-4 items-center">
          <div class="flex gap-2 items-center">
            {props.data.tags.map(tag => (
              <div class="py-0.5 px-3 bg-primary/10 font-medium rounded-full text-primary backdrop-blur backdrop-brightness-125">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      {props.data.collage && <Collage items={props.data.collage} />}
      {props.data.overview && <Overview {...props.data.overview} />}
      <div class="flex items-center gap-4 my-16">
        <div class="flex-1 h-1 bg-slate-500 rounded-full" />
        <div class="font-medium text-2xl">case study</div>
        <div class="flex-1 h-1 bg-slate-500 rounded-full" />
      </div>
      <article class="flex flex-col-reverse lg:flex-row items-start gap-12 max-w-none">
        <div class="min-w-0">
          <props.default components={{ img: Img, Img }} />
        </div>
        <Sidebar toc={props.toc} />
      </article>
    </div>
  )
}

const Collage = props => {
  const [active, setActive] = createSignal(0)

  const sources = Object.keys(props.items)
  const captions = Object.values(props.items)

  return (
    <article class="max-w-none">
      <figure>
        <div class="not-prose flex flex-col gap-1 bg-slate-600/50 border-4 border-transparent rounded-2xl backdrop-blur backdrop-brightness-125">
          <Img
            title="controls"
            class="rounded-md aspect-video object-cover object-top"
            src={sources[active()]}
          />
          <div class="flex gap-1 max-h-28">
            {sources.map((item, i) => (
              <button
                onClick={() => setActive(i)}
                class="flex flex-1 items-center justify-center rounded-md"
              >
                <Img
                  title="controls"
                  class={`pointer-events-none rounded-md object-cover h-full ${
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
        <figcaption>{captions[active()]}</figcaption>
      </figure>
    </article>
  )
}

const Overview = props => {
  const Section = props => (
    <div>
      <h2 class="text-xl uppercase tracking-wider font-semibold text-primary">
        {props.title}
      </h2>
      <p
        class={`flex gap-2 flex-wrap ${
          props.fullWidth ? "" : "md:max-w-min md:whitespace-nowrap"
        }`}
      >
        {props.children}
      </p>
    </div>
  )
  return (
    <article class="flex flex-col max-w-none">
      <Section fullWidth title={<div class="w-full">Project Summary</div>}>
        {props.summary}
      </Section>
      <div class="flex flex-col md:flex-row justify-between gap-x-6">
        <Section title="Roles & Responsibilites">
          {props.roles.map(role => (
            <div class="leading-none rounded py-1 px-2 uppercase bg-slate-700">
              {role}
            </div>
          ))}
        </Section>
        <Section title="Tools & Technologies">
          {props.tools.map(tool => (
            <div class="leading-none rounded py-1 px-2 bg-slate-700/50 backdrop-blur backdrop-brightness-125">
              {typeof tool === "string"
                ? tool
                : tool.map((t, i) => (
                    <>
                      {i === 0 || (
                        <span class="text-slate-900 font-bold font-mono mx-1">
                          /
                        </span>
                      )}
                      {t}
                    </>
                  ))}
            </div>
          ))}
        </Section>
        <Section title="Sources & Links">
          {Object.entries(props.sources).map(([name, href]) => (
            <a href={href} class="font-medium">
              {name}
            </a>
          ))}
        </Section>
      </div>
    </article>
  )
}

const Sidebar = props => {
  const [active, setActive] = createSignal({})
  const activeHeading = createMemo(() => {
    const entries = Object.entries(active()).filter(([k, v]) => v)
    if (entries.length > 0) {
      return entries.slice(-1)?.[0]?.[0]
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
              ? true
              : false,
        })
      ),
    { rootMargin: "0px 0px -50% 0px" }
  )
  onMount(() =>
    props.toc.forEach(h =>
      headingObserver.observe(document.getElementById(h.id))
    )
  )

  const Section = props => (
    <div class="flex flex-col gap-4">
      <h2 class="text-xl uppercase lg:whitespace-nowrap tracking-wider font-semibold text-primary">
        {props.title}
      </h2>
      <div class="flex flex-col">{props.children}</div>
      {props.extra}
    </div>
  )

  return (
    <div class="not-prose flex flex-col gap-12 py-12 lg:sticky lg:top-0 lg:max-w-min w-full">
      <Section title="Table of Contents">
        {props.toc.map(h => (
          <A
            href={`#${h.id}`}
            class={`no-underline ${
              activeHeading() === h.id
                ? "text-slate-50 font-black"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {h.value}
          </A>
        ))}
      </Section>
      <Section title="Topics Shown">
        <a>design</a>
        <a>engineering</a>
        <div class="pt-4 text-lg text-slate-400">
          You're currently being shown case study information in Design and
          Engineering! Not interested in one of the topics? Click the pill to
          hide it!
        </div>
      </Section>
      <A
        href="/"
        class="block text-center border-2 border-slate-700/50 rounded-lg no-underline bg-slate-900/50 hover:bg-slate-900/75 backdrop-blur transition-all hover:shadow-sm p-2.5 text-lg font-medium"
      >
        back to home
      </A>
    </div>
  )
}

const autoplayObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry =>
      entry.isIntersecting ? entry.target.play() : entry.target.pause()
    ),
  { threshold: 0.5 }
)
const Img = props => {
  let ref
  onMount(() => {
    if (ref && props.title !== "controls") {
      autoplayObserver.observe(ref)
    }
  })
  const content = (
    <Switch>
      <Match when={!props.src.endsWith(".webm")}>
        <img
          class={`w-full rounded-md ${props.class}`}
          src={props.src}
          alt={props.alt}
        />
      </Match>
      <Match when={props.src.endsWith(".webm")}>
        <video
          ref={ref}
          src={props.src}
          class={`w-full rounded-md ${props.class}`}
          controls={props.title === "controls"}
          muted={props.title !== "controls"}
          autoplay={props.title !== "controls"}
          loop={props.title !== "controls"}
          preload="metadata"
        >
          <source src={props.src} alt={props.alt} type="video/webm" />
        </video>
      </Match>
    </Switch>
  )

  return props.alt?.length > 0 ? (
    <figure>
      {content}
      <figcaption>{props.alt}</figcaption>
    </figure>
  ) : (
    <>{content}</>
  )
}

const Topic = props => {
  const data = {
    design: {
      color: "bg-purple text-purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      ),
    },
    engineering: {
      color: "bg-purple text-purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          />
        </svg>
      ),
    },
  }
}

export default WorkTemplate
