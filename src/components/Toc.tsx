import {
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";

export const Toc = (props: { desc: string[] }) => {
  const [activeHeading, setActiveHeading] = createSignal<string>();

  const [toc, setToc] = createSignal<{ depth: number; slug: string; text: string }[]>([]);
  onMount(() =>
    setToc(
      [...document.querySelectorAll<HTMLElement>("article :is(h1, h2)")]
        .filter((el) => el.id)
        .map((el) => ({
          depth: Number(el.tagName[1]),
          slug: el.id,
          text: el.textContent ?? "",
        }))
    )
  );

  createEffect(() => {
    const slugs = toc().map((h) => h.slug);

    const update = () => {
      let current: string | undefined;
      for (const slug of slugs) {
        const el = document.getElementById(slug);
        if (!el) continue;
        if (el.getBoundingClientRect().top > 1) break;
        current = slug;
      }
      setActiveHeading(current);
    };

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    onCleanup(() => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    });
  });

  const scrollTo = (slug: string) =>
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });

  const tab = (on: boolean) =>
    `background: none; border: 0; padding: 0; font: inherit; cursor: pointer; text-align: left; color: var(${on ? "--color-text" : "--color-text-subtle"})`;

  return (
    <div style="display: flex; flex-direction: column; gap: 1ch">
      <div style="display: flex; gap: 2ch">
        <button
          style={tab(!activeHeading())}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          about
        </button>
        <Show when={toc().length}>
          <button
            style={tab(!!activeHeading())}
            onClick={() => {
              const first = toc()[0];
              if (first) scrollTo(first.slug);
            }}
          >
            devlog
          </button>
        </Show>
      </div>

      <Show
        when={activeHeading()}
        fallback={
          <For each={props.desc}>{(para) => <div innerHTML={para} />}</For>
        }
      >
        <div style="display: flex; flex-direction: column">
          <For each={toc()}>
            {(h) => (
              <button
                style={`background: none; border: 0; padding: 0; font: inherit; cursor: pointer; text-align: left; padding-left: ${
                  h.depth > 1 ? "2ch" : "0"
                }; color: var(${
                  activeHeading() === h.slug
                    ? "--color-text"
                    : "--color-text-subtle"
                })`}
                onClick={() => scrollTo(h.slug)}
              >
                {h.text}
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default Toc;
