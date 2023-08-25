import { Match, Switch, createSignal, observable, onMount } from "solid-js"
import { A } from "@solidjs/router"
import { useGrid } from "./grid"

const WorkTemplate = props => {
  const { setColor } = useGrid()
  onMount(() => {
    setColor("#59786b")
  })
  return (
    <div class="mx-auto gap-8 max-w-7xl px-[min(10vw,128px)]">
      <div class="flex flex-col gap-4 w-full items-center text-center py-16">
        <div class="text-4xl font-semibold font-mono">{props.name}</div>
        <div class="text-2xl">{props.desc}</div>
        <div class="flex gap-4 items-center">
          <div class="flex gap-2 items-center">
            {props.tags.map(tag => (
              <div class="py-0.5 px-3 bg-primary/10 font-medium rounded-full text-primary backdrop-blur backdrop-brightness-125">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <article class="prose prose-invert prose-xl prose-a:link mx-auto max-w-none">
        {props.collage && <Collage items={props.collage} />}
        {props.overview && <Overview {...props.overview} />}
        <div class="flex items-center gap-4 my-16">
          <div class="flex-1 h-1 bg-slate-500 rounded-full" />
          <div class="font-medium text-2xl">case study</div>
          <div class="flex-1 h-1 bg-slate-500 rounded-full" />
        </div>
        {props.children}
      </article>
      <div class="flex w-full justify-center pt-16">
        <A
          href="/"
          class="border-2 rounded-xl no-underline bg-slate-900/30 backdrop-blur hover:bg-slate-800 hover:border-slate-800 transition-all hover:shadow-sm border-slate-600 px-6 py-3 text-lg font-medium"
        >
          back to home
        </A>
      </div>
    </div>
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
    <div class="flex flex-col">
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
    </div>
  )
}

export const Img = props => {
  let ref, observer
  onMount(() => {
    if (ref && props.title !== "controls") {
      ref.muted = true
      observer = new IntersectionObserver(
        entries =>
          entries.forEach(entry =>
            entry.intersectionRatio < 0.5 ? ref.pause() : ref.play()
          ),
        { threshold: 0.5 }
      )
      observer.observe(ref)
    }
  })
  const content = (
    <Switch>
      <Match when={!props.src.endsWith(".webm")}>
        <img class={props.class} src={props.src} alt={props.alt} />
      </Match>
      <Match when={props.src.endsWith(".webm")}>
        <video
          ref={ref}
          src={props.src}
          class={`w-full ${props.class}`}
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

const Collage = props => {
  const [active, setActive] = createSignal(0)

  const sources = Object.keys(props.items)
  const captions = Object.values(props.items)

  return (
    <figure>
      <div class="not-prose flex flex-col gap-1 bg-slate-600/50 border-4 overflow-hidden border-transparent rounded-2xl backdrop-blur backdrop-brightness-125">
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
  )
}

export default WorkTemplate
