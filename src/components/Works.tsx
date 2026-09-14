import { For, Show } from "solid-js";
import {
  archives,
  filter,
  hoveredWork,
  setHoveredWork,
  type Work,
} from "./sharedState";

export const Works = (props: { works: Work[] }) => {
  const shown = () =>
    props.works.filter(
      (work) =>
        (archives() || !work.archive) &&
        filter().every((tag) => work.tags.includes(tag))
    );

  return (
    <div style="width: 100%; display: flex; flex-direction: column; gap: 2ch">
      <For each={shown()}>
        {(work) => {
          const hovered = () => hoveredWork() === work;
          return (
            <div
              style={{
                color: "var(--color-text-subtle)",
                position: "relative",
                display: "flex",
                "align-items": "baseline",
                gap: "1ch",
                padding: "  2ch",
                border: "1px solid var(--pink)",
                ...(hovered() && {
                  "background-color": "#00000011",
                  "font-style": "italic",
                })
              }}
            >
              <a
                href={work.directLink ?? `/work/${work.name}`}
                onpointerenter={() => setHoveredWork(work)}
                onpointerleave={() => setHoveredWork(null)}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  flex: 1,
                  "min-width": 0,
                }}
              >
                <style>{`@scope { &:after { content: ""; position: absolute; inset: 0; } }`}</style>
                <span>
                  <Show when={work.tags.includes("selected")}>
                    <span style="font-family: var(--font-vg5000);">[💖] </span>
                  </Show>
                  {work.name}
                  <span style={{ "font-family": "var(--font-vg5000)", display: hovered() ? "inline" : "none", "margin-left": "1ch", color: "var(--color-text-silent)" }}>
                    <Show when={work.directLink} fallback={
                      <>🗒</>
                    }>
                      <>↗</>
                    </Show>
                  </span>
                </span>
                {work.subtitle && (
                  <span style={{ color: "var(--color-text-subtle)" }}>
                    {work.subtitle}
                  </span>
                )}
              </a>
              <span style={{
                "flex-shrink": 0,
                display: "flex",
                "align-items": "baseline",
                gap: "1ch",
                "font-family": "var(--font-vg5000)"
              }}>
                {work.tags.map(tag => <div>[{tag}]</div>)}
                <span>{stamp(work.date)}</span>
              </span>
            </div>
          );
        }}
      </For>
    </div>
  );
};

const MONTHS = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");
const stamp = (date: string) => {
  const [year, month] = date.split("-");
  return `${MONTHS[Number(month) - 1]}.${year.slice(2)}`;
};

export default Works;
