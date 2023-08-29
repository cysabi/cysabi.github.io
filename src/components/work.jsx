import { A } from "@solidjs/router"
import {
  Match,
  Show,
  Switch,
  createMemo,
  createSignal,
  onMount,
} from "solid-js"
import { useGrid } from "./grid"

const WorkTemplate = props => {
  const { setColor } = useGrid()
  onMount(() => {
    setColor("#59786b")
  })

  return (
    <div class="mx-auto gap-8 max-w-7xl px-12">
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
      <div class="flex items-center gap-4 py-12 -mb-2">
        <div class="flex-1 h-1 bg-slate-500 rounded-full" />
        <div class="font-medium text-2xl">case study</div>
        <div class="flex-1 h-1 bg-slate-500 rounded-full" />
      </div>
      <article class="flex flex-col-reverse lg:flex-row items-start gap-12 max-w-none">
        <div class="min-w-0">
          <div class="mb-12" />
          <props.default
            components={{
              h1: props => (
                <h2
                  {...props}
                  class="font-mono text-slate-500 uppercase text-xl sm:text-2xl tracking-wide font-semibold mt-[2em]"
                >
                  # {props.children}
                </h2>
              ),
              h2: props => {
                const topic = props.children.split(" # ")
                return (
                  <h3
                    {...props}
                    class="inline-flex items-center gap-3 text-xl sm:text-2xl"
                  >
                    {topic.length > 1 && (
                      <TopicBadge icon>{topic[0]}</TopicBadge>
                    )}
                    {topic.length > 1 ? topic[1] : props.children}
                  </h3>
                )
              },
              h3: props => (
                <h4
                  class="text-xl sm:text-2xl font-medium text-slate-300"
                  {...props}
                />
              ),
              blockquote: props => (
                <blockquote
                  class="text-xl sm:text-2xl not-italic font-normal text-slate-50"
                  {...props}
                />
              ),
              img: Img,
              em: props => (
                <em
                  class={
                    props.children?.startsWith("(") ? "text-slate-400" : ""
                  }
                  {...props}
                />
              ),
              a: A,
              Img,
              Topic,
            }}
          />
        </div>
        <Sidebar toc={props.toc} roles={props.data.overview?.roles} />
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
        <div class="not-prose flex flex-col gap-1 overflow-clip bg-slate-600/50 border-4 border-transparent rounded-2xl backdrop-blur backdrop-brightness-125">
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
    <div class={props.fullWidth ? "" : "md:max-w-min"}>
      <h2 class="text-xl uppercase tracking-wider md:whitespace-nowrap font-semibold text-primary">
        {props.title}
      </h2>
      <p class="flex gap-2 flex-wrap">{props.children}</p>
    </div>
  )
  return (
    <article class="flex flex-col max-w-none">
      <Section fullWidth title="Project Summary">
        {props.summary}
      </Section>
      <div class="flex flex-col md:flex-row justify-between gap-x-6">
        <Section title="Roles & Responsibilites">
          {props.roles.map(role => (
            <TopicBadge>{role}</TopicBadge>
          ))}
          <div class="mt-4 p-2 text-lg w-full rounded-lg backdrop-blur bg-primary-400/[0.05] border-primary-400/20 text-primary-100 border-2">
            <div class="inline-flex items-center justify-center align-sub translate-y-[1px] mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 inline"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span>Click the eye to hide topics you're not interested in!</span>
          </div>
        </Section>
        <Section title="Tools & Technologies">
          {props.tools.map(tool => (
            <div class="leading-none md:whitespace-nowrap rounded py-1 px-2 bg-slate-700/25 backdrop-blur backdrop-brightness-125">
              {typeof tool === "string"
                ? tool
                : tool.map((t, i) => (
                    <>
                      {i === 0 || (
                        <span class="text-slate-600 font-mono font-black mx-1">
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
          {props.sources ? (
            <div class="flex flex-col gap-4">
              {Object.entries(props.sources).map(([name, href]) => (
                <a href={href} class="font-medium leading-none">
                  {name}
                </a>
              ))}
            </div>
          ) : (
            <div class="text-slate-500 text-lg">
              sorry! there's no links for this project.
            </div>
          )}
        </Section>
      </div>
    </article>
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

  const Section = props => (
    <div class="flex flex-col gap-5">
      <h2 class="text-xl uppercase lg:whitespace-nowrap tracking-wider font-semibold text-primary">
        {props.title}
      </h2>
      <div class="flex flex-col gap-2">{props.children}</div>
      {props.extra}
    </div>
  )

  return (
    <div class="not-prose flex flex-col gap-12 pt-12 lg:sticky lg:top-0 lg:max-w-min w-full text-base">
      <Section title="Table of Contents">
        {toc.map(h => (
          <button
            onclick={() =>
              document
                .getElementById(h.id)
                .scrollIntoView({ behavior: "smooth" })
            }
            class={`text-left no-underline leading-tight ${
              (h.depth - 1) * 16 ? "" : ""
            } ${
              activeHeading() === h.id
                ? "text-slate-50 font-medium tracking-[-0.01em]"
                : "text-slate-400"
            } ${
              hiddenTopics().includes(h.value.split(" # ").at(0))
                ? "text-slate-600 pointer-events-none"
                : "hover:text-slate-300"
            }`}
            style={`padding-left: ${(h.depth - 1) * 16}px`}
          >
            <span class="line-clamp-2">{h.value.split(" # ").at(-1)}</span>
          </button>
        ))}
      </Section>
      <Section title="Topics Shown">
        {props.roles?.map(role => (
          <TopicBadge>{role}</TopicBadge>
        ))}
        <div class="pt-4 text-slate-400">
          Not interested in a topic? Click the eye to hide it's content!
        </div>
      </Section>
      <A
        href="/#works"
        class="block text-center border-2 border-slate-700/50 rounded-lg no-underline bg-slate-900/50 hover:bg-slate-900/75 backdrop-blur transition-all hover:shadow-sm p-2.5 text-lg font-medium"
      >
        all works
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
    <Switch
      fallback={
        <img
          class={`w-full rounded-md ${props.class}`}
          src={props.src}
          alt={props.alt}
          loading="lazy"
        />
      }
    >
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
  const { hiddenTopics } = useGrid()

  return (
    <Show when={!hiddenTopics().includes(Object.keys(props).at(0))}>
      {props.children}
    </Show>
  )
}

const TopicBadge = props => {
  const { hiddenTopics, toggleTopic } = useGrid()
  const topicData = {
    design: {
      class: "bg-grid-purple-500/20 text-grid-purple-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      ),
    },
    engineering: {
      class: "bg-grid-teal-500/20 text-grid-teal-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          />
        </svg>
      ),
    },
  }

  if (props.icon) {
    return (
      <div
        class={`p-2 backdrop-blur backdrop-brightness-125 flex items-center gap-2 text-2xl rounded-lg ${
          topicData[props.children].class
        }`}
      >
        {topicData[props.children].icon}
      </div>
    )
  }

  return (
    <div class="flex items-center gap-2 justify-between w-full">
      <div
        class={`${
          topicData[props.children].class
        } backdrop-blur backdrop-brightness-125 flex items-center px-2 py-0.5 gap-2 font-semibold capitalize rounded-md text-lg`}
      >
        {topicData[props.children].icon}
        {props.children}
      </div>
      <button
        class="text-slate-500 hover:text-slate-300"
        onClick={() => toggleTopic(props.children)}
      >
        <Switch
          fallback={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fill-rule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clip-rule="evenodd"
              />
            </svg>
          }
        >
          <Match when={hiddenTopics().includes(props.children)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>
          </Match>
        </Switch>
      </button>
    </div>
  )
}

export default WorkTemplate
