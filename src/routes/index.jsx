import { Motion } from "solid-motionone";
import { spring } from "motion";
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { useGrid } from "../components/layout";
import components, { Collage, topicsData } from "../components/work";
import works from "./works";

const hi = () => (
  <>
    <p>
      hi there ~ i'm a self-taught designer/hacker that cares a little too much
      about people's experiences!! i love tinkering with tech to make new
      things, and exploring better ways to serve you
    </p>
    <p>
      please don't be afraid to{" "}
      <a
        href="https://bsky.app/profile/cysabi.github.io"
        class="font-medium text-slate-50"
      >
        say hi
      </a>
      ! im always open to new opportunities, no matter the medium!
    </p>
  </>
);

const Index = () => {
  const { setColor, hovering } = useGrid();
  const [index, setIndex] = createSignal(0);

  const [params, setParams] = useSearchParams();
  const tags = () => new Set(params.tags?.split("-") || allTags);
  const topics = () => new Set(params.topics?.split("-") || allTopics);
  const toggleParam = (key, value) => {
    let newParams = new Set(params[key]?.split("-") || []);
    if (newParams.has(value)) {
      newParams.delete(value);
    } else {
      newParams.add(value);
    }
    let all;
    if (key === "tags") {
      all = allTags;
    } else if (key === "topics") {
      all = allTopics;
    }
    setParams({
      [key]:
        all.length !== newParams.size ? Array.from(newParams).join("-") : null,
    });
  };

  const filteredWorks = createMemo(() => {
    return works
      .filter((work) =>
        work.data.tags
          ? work.data.tags.some((tag) => tags().has(tag))
          : allTags.length === tags().size
      )
      .filter((work) => !work.data.archive || params.archives)
      .filter((work) =>
        work.data.topics
          ? work.data.topics.some((topic) => topics().has(topic))
          : allTopics.length === topics().size
      );
  });

  const work = createMemo(() => works.find((w) => w.data.name === params.work));
  onMount(() => {
    setColor(false);
  });

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
                      href="https://bsky.app/profile/cysabi.github.io"
                      class="hover:text-primary-50"
                    >
                      bsky
                    </a>
                  </div>
                </div>
                <div class="flex flex-col gap-4 text-slate-300 leading-relaxed">
                  {hovering() ? (
                    <div class="mt-1 flex flex-col gap-4 text-slate-300 leading-relaxed">
                      {hovering()?.desc}
                      <Tools tools={hovering().tools} />
                    </div>
                  ) : (
                    hi()
                  )}
                </div>
                <div class="hidden lg:block lg:my-auto" />
                <div class="hidden lg:flex gap-2 flex-wrap items-center">
                  {allTags.map((tag) => (
                    <button
                      onClick={() => toggleParam("tags", tag)}
                      class={`transition-all rounded line-through leading-none decoration-2 decoration-transparent py-1 px-2 text-xl font-medium bg-primary/10 text-primary hover:scale-105 backdrop-blur backdrop-brightness-125 ${
                        tags().has(tag) ||
                        "bg-transparent text-slate-500 hover:text-slate-400 !decoration-slate-500 hover:!decoration-slate-400"
                      } ${
                        hovering() &&
                        (!hovering()?.tags?.includes(tag)
                          ? "blur-[2px] opacity-50"
                          : "!backdrop-brightness-150")
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
                  {(tag) => (
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
                      {(source) => (
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
                } ${
                  hovering() &&
                  (!hovering()?.topics?.includes(key)
                    ? "blur-[2px] opacity-50"
                    : "!backdrop-brightness-150")
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
        <article class="w-full">
          <Show
            when={work()}
            fallback={
              <div class="grid gap-16 grid-cols-1 xl:grid-cols-2 not-prose">
                <For each={filteredWorks()}>
                  {(work) => (
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
  );
};

const WorkPreview = (props) => {
  const angle = Math.random() * Math.PI * 2;
  const imgOffset = {
    x: Math.cos(angle) * 300,
    y: Math.sin(angle) * 300,
  };
  let ref;
  const [lean, setLean] = createSignal({ img: imgOffset, orb: { x: 0, y: 0 } });
  const [hov, setHov] = createSignal();
  const { setHover } = useGrid();

  return (
    <Motion.button
      ref={ref}
      onClick={() => {
        if (typeof props.data.archive === "string") {
          location.href = props.data.archive;
        } else {
          setHover(false);
          props.setParams({ work: props.data.name });
          window.scrollTo(0, 0);
        }
      }}
      onmouseenter={() => {
        setHover(props.data);
        setHov(true);
      }}
      onmouseleave={() => {
        setHover(false);
        setHov(false);
        setLean({ img: imgOffset, orb: { x: 0, y: 0 } });
      }}
      onmousemove={(e) => {
        const rect = ref.getBoundingClientRect();
        const x = (e.clientX - (rect.x + rect.width / 2)) / rect.width;
        const y = (e.clientY - (rect.y + rect.height / 2)) / rect.height;
        setLean({
          orb: {
            x: Math.sqrt(Math.abs(x)) * Math.sign(x) * 2,
            y: Math.sqrt(Math.abs(y)) * Math.sign(y) * 2,
          },
        });
      }}
      transition={{ easing: spring({ stiffness: 600, damping: 50 }) }}
      animate={{
        x: lean().orb.x * 12.5,
        y: lean().orb.y * 12.5,
        scale: hov() ? 1.05 : 1,
      }}
      class="relative backdrop-blur backdrop-brightness-125 rounded-2xl p-2 overflow-clip bg-primary/10 group"
    >
      <div class="relative aspect-video overflow-clip rounded-lg">
        <Motion.img
          animate={{
            opacity: hov() ? 0.1 : 1,
            "--tw-blur": hov() ? "blur(4px)" : "blur(0px)",
          }}
          class="absolute filter rounded-lg"
          src={props.data.previews[0]}
        />
      </div>
      <Show when={props.data.archive}>
        <div class="absolute inset-0 flex items-end justify-end p-3.5">
          <Motion.div class="p-1.5 rounded-md bg-slate-700/75 text-slate-300 backdrop-blur backdrop-brightness-125 duration-300 group-hover:backdrop-blur-0 group-hover:backdrop-brightness-100 group-hover:bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-archive"
            >
              <rect width="20" height="5" x="2" y="3" rx="1" />
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
              <path d="M10 12h4" />
            </svg>
          </Motion.div>
        </div>
      </Show>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hov() ? 1 : 0 }}
        class="absolute inset-0 flex flex-col p-8 gap-4 items-center justify-center"
      >
        <div class="flex items-center gap-1.5">
          <div class="font-mono text-slate-50 text-3xl font-semibold tracking-tight">
            {props.data.name}
          </div>
          <Show when={typeof props.data.archive === "string"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 mt-1"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
              />
            </svg>
          </Show>
        </div>
        <span class="font-sans leading-normal text-slate-300">
          {props.data?.subtitle}
        </span>
      </Motion.div>
    </Motion.button>
  );
};

const TableOfContents = (props) => {
  // watch heading active state
  const [active, setActive] = createSignal({});
  const toc = createMemo(() =>
    props
      .work()
      .toc.flatMap((h) =>
        h.children ? [h, ...h.children].filter((h) => h.depth < 3) : h
      )
  );

  createEffect(() => {
    const headingObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          setActive({
            ...active(),
            [entry.target.id]:
              entry.isIntersecting || entry.boundingClientRect.y < 0
                ? entry
                : false,
          })
        ),
      { rootMargin: "0px 0px -50% 0px" }
    );
    toc().forEach((h) =>
      headingObserver.observe(document.getElementById(h.id))
    );
    onCleanup(() => {
      headingObserver.disconnect();
    });
  });

  const onClick = (h) =>
    document.getElementById(h.id).scrollIntoView({ behavior: "smooth" });
  const header = (h) => h.value.split(" # ");
  const activeHeading = createMemo(
    () =>
      Object.entries(active())
        .filter((h) => h[1])
        .at(-1)?.[0]
  );

  return (
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-4">
        <div
          class={`font-semibold text-base ${
            activeHeading() ? "text-slate-500" : "text-primary"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            about
          </button>
        </div>
        <div class="border-t-2 border-dotted grow border-slate-600 mt-0.5" />
        <Show when={props.work().toc.length}>
          <div
            class={`font-semibold text-base ${
              activeHeading() ? "text-primary" : "text-slate-500"
            }`}
          >
            <button
              onClick={() =>
                document
                  .getElementById(toc()[0]?.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              devlog
            </button>
          </div>
        </Show>
      </div>
      <div class="flex items-stretch">
        <div class="flex flex-col items-end w-full -my-1">
          {activeHeading() ? (
            toc().map((h) => (
              <button
                onclick={() => onClick(h)}
                class={`no-underline py-1 leading-tight ${
                  h.depth > 1
                    ? "text-base pr-2.5 border-r-2 border-slate-700"
                    : "text-base font-mono"
                } ${
                  activeHeading() === h.id
                    ? `text-slate-50 font-medium ${
                        h.depth > 1 && "tracking-[-0.0095em]"
                      }`
                    : "text-slate-400"
                } ${
                  header(h).length > 1 && !props.topics().has(header(h).at(0))
                    ? "text-slate-600 pointer-events-none"
                    : "hover:text-slate-300"
                }`}
              >
                <span class="line-clamp-2 text-right">{header(h).at(-1)}</span>
              </button>
            ))
          ) : (
            <div class="flex flex-col mt-1 gap-4 text-slate-300 leading-relaxed">
              {props.work().data.desc}
              <Tools tools={props.work().data.tools} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Tools = (props) => (
  <div class="flex items-baseline mt-2 flex-wrap gap-3 text-slate-300 font-mono leading-none font-medium text-base ml-[-2px]">
    <For each={props.tools}>
      {(tool) => (
        <div class="backdrop-blur backdrop-brightness-125 rounded border-slate-600/50 border-2 flex px-2 py-1">
          {tool}
        </div>
      )}
    </For>
  </div>
);

const _countedTags = works
  .filter((work) => work.data.tags)
  .flatMap((work) => work.data.tags)
  .reduce((p, c) => {
    p[c] = (p[c] || 0) + 1;
    return p;
  }, {});
const allTags = Object.keys(_countedTags).sort(
  (a, b) => _countedTags[b] > _countedTags[a]
);

const allTopics = Object.keys(topicsData);
const egg =
  "transition-all delay-500 duration-500 group-hover:delay-0 group-hover:duration-0";
const subtitles = [
  "empathy included !",
  <>
    <span class="group">
      <span class={egg + " group-hover:text-[#00a82f]"}>a</span>
      <span class={egg + " group-hover:text-[#9cd56c]"}>r</span>
      <span class={egg + " group-hover:text-[#f7f7f7]"}>o</span>
    </span>{" "}
    <span class="group">
      <span class={egg + " group-hover:text-[#a6a6a6]"}>a</span>
      <span class={egg + " group-hover:text-[#fffffe]"}>c</span>
      <span class={egg + " group-hover:text-[#761b7a]"}>e</span>
    </span>{" "}
    <span class="group">
      <span class={egg + " group-hover:text-[#fff439]"}>a</span>
      <span class={egg + " group-hover:text-[#ffffff]"}>n</span>
      <span class={egg + " group-hover:text-[#9e5ed1]"}>y</span>
    </span>
  </>,
  "sorry in advance for missing that social cue",
  "🧋❤️",
];

export default Index;
