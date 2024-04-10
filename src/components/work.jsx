import { A } from "@solidjs/router"
import { For, Match, Show, Switch, createSignal, onMount } from "solid-js"
import { useGrid } from "./layout"

const WorkTemplate = props => (
  <props.default
    components={{
      h1: props => (
        <h2
          class="font-mono text-slate-500 uppercase text-2xl tracking-wide font-semibold mt-[2em]"
          {...props}
        >
          # {props.children}
        </h2>
      ),
      h2: props => {
        const topic = props.children.split(" # ")
        return (
          <h3 class="font-display flex items-center gap-3 text-2xl" {...props}>
            {topic.length > 1 && (
              <div
                class={`p-2 backdrop-blur backdrop-brightness-125 flex items-center gap-2 text-2xl rounded-lg ${
                  topics[topic[0]].class
                }`}
              >
                {topics[topic[0]].icon}
              </div>
            )}
            {topic.length > 1 ? topic[1] : props.children}
          </h3>
        )
      },
      h3: props => {
        const topic = props.children.split(" # ")
        return (
          <h4
            class="font-display flex items-center gap-3 text-2xl text-slate-300"
            {...props}
          >
            {topic.length > 1 && (
              <div
                class={`p-2 backdrop-blur backdrop-brightness-125 flex items-center gap-2 text-2xl rounded-lg ${
                  topics[topic[0]].class
                }`}
              >
                {topics[topic[0]].icon}
              </div>
            )}
            {topic.length > 1 ? topic[1] : props.children}
          </h4>
        )
      },
      blockquote: props => (
        <blockquote
          class="text-2xl not-italic font-normal text-slate-50"
          {...props}
        />
      ),
      img: Img,
      em: props => (
        <em
          class={props.children?.startsWith("(") ? "text-slate-400" : ""}
          {...props}
        />
      ),
      a: A,
      strong: props => <strong class="font-bold" {...props} />,
      pre: props => <pre class="backdrop-blur bg-slate-950/50" {...props} />,
      code: props => (
        <code
          class="backdrop-blur font-normal bg-slate-950/50 rounded-sm p-[0.125em]"
          {...props}
        />
      ),
      Img,
      Topic,
      Testimonials,
    }}
  />
)

const autoplayObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry =>
      entry.isIntersecting ? entry.target.play() : entry.target.pause()
    ),
  { threshold: 0.5 }
)
export const Img = props => {
  let ref
  onMount(() => {
    if (ref && props.title !== "controls") {
      autoplayObserver.observe(ref)
    }
  })

  console.log(props.src)

  const content = (
    <Switch fallback={<ImgContent ref={ref} {...props} />}>
      <Match when={props.src.split("%7C").length > 1}>
        <div class="flex gap-4 -my-12">
          <For each={props.src.split("%7C")}>
            {src => {
              console.log(src)
              return <ImgContent ref={ref} {...props} src={src} />
            }}
          </For>
        </div>
      </Match>
    </Switch>
  )

  return (
    <Switch fallback={content}>
      <Match when={props.alt?.length > 0}>
        <figure>
          {content}
          <figcaption>{props.alt}</figcaption>
        </figure>
      </Match>
    </Switch>
  )
}

const ImgContent = props => (
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
        ref={props.ref}
        src={props.src}
        class={`w-full rounded-md ${props.class}`}
        controls={props.title === "controls"}
        muted={props.title !== "controls"}
        autoplay={props.title !== "controls"}
        loop={props.title !== "controls"}
        preload="metadata"
        playsinline
      >
        <source src={props.src} alt={props.alt} type="video/webm" />
      </video>
    </Match>
  </Switch>
)

const Topic = props => {
  const { hiddenTopics } = useGrid()

  return (
    <Show when={!hiddenTopics().includes(Object.keys(props).at(0))}>
      {props.children}
    </Show>
  )
}

export const topics = {
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
  code: {
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

const Testimonials = props => {
  const [index, setIndex] = createSignal(0)

  return (
    <div class="bg-slate-700 rounded-lg p-4 gap-4 flex flex-col">
      <div class="flex items-center justify-start flex-wrap leading-none gap-4">
        <div class="flex items-center mr-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6 flex-shrink-0 inline mr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <div class="font-semibold text-slate-300">{props.title}</div>
        </div>
        <button
          onClick={() =>
            setIndex(
              (props.stories.length + index() - 1) % props.stories.length
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6 flex-shrink-0 transition-colors hover:text-primary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <div class="font-mono -tracking-wider">
          {index() + 1}/{props.stories.length}
        </div>
        <button onClick={() => setIndex((index() + 1) % props.stories.length)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6 flex-shrink-0 transition-colors hover:text-primary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
      <div class="text-lg text-slate-50 italic lowercase">
        "{props.stories[index()]}"
      </div>
    </div>
  )
}

export const Collage = props => {
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

export default WorkTemplate
