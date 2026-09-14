import { createSignal, For } from "solid-js";

const bare =
  "background: none; border: 0; padding: 0; color: inherit; font: inherit; cursor: pointer";

export const Testimonials = (props: { title: string; stories: string[] }) => {
  const [index, setIndex] = createSignal(0);

  const step = (by: number) =>
    setIndex((props.stories.length + index() + by) % props.stories.length);

  const paragraphs = () => props.stories[index()].split("\n\n");

  return (
    <div style="display: flex; flex-direction: column; gap: 1ch">
      <div
        style="display: flex; align-items: center; flex-wrap: wrap; gap: 1ch"
      >
        <div
          style="display: flex; align-items: center; gap: 1ch; margin-right: auto"
        >
          <span aria-hidden="true">
            {"\u{1F4AC}︎"}
          </span>
          <div>{props.title}</div>
        </div>

        <button onClick={() => step(-1)} aria-label="previous" style={bare}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <div>
          {index() + 1}/{props.stories.length}
        </div>
        <button onClick={() => step(1)} aria-label="next" style={bare}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1ch">
        <For each={paragraphs()}>
          {(p, i) => (
            <p>
              {i() === 0 ? `"${p}` : p}
              {i() === paragraphs().length - 1 ? '"' : ""}
            </p>
          )}
        </For>
      </div>
    </div>
  );
};

export default Testimonials;
