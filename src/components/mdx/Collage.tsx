import { createSignal, For, Show } from "solid-js";


export const Collage = (props: { items: { src: string; caption: string; }[] }) => {
  const [active, setActive] = createSignal(0);

  const current = () => props.items[active()];
  const isVideo = (src: string) => src.endsWith(".webm");

  return (
    <figure style="display: flex; flex-direction: column; gap: 1ch">
      <Show
        when={isVideo(current().src)}
        fallback={<img src={current().src} alt="" style="width: 100%; aspect-ratio: 16 / 9; object-fit: contain;" />}
      >
        <video
          src={current().src}
          style="width: 100%; aspect-ratio: 16 / 9; object-fit: contain;"
          controls
          autoplay
          muted
          preload="auto"
          playsinline
        />
      </Show>
      <div style="display: flex; gap: 1ch; height: 8ch">
        <For each={props.items}>
          {(item, i) => (
            <button
              onClick={() => setActive(i())}
              style={`flex: 1 1 0%; position: relative; padding: 0; background: none; cursor: pointer; opacity: ${
                active() === i() ? "1" : "0.4"
              }`}
            >
              <Show when={isVideo(item.src)}>
                <div
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m14.024-.983a1.125 1.125 0 0 1 0 1.967l-5.603 3.112A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.922-1.4 1.671-.983z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Show>
              <Show
                when={isVideo(item.src)}
                fallback={<img src={item.src} alt="" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />}
              >
                <video src={item.src} preload="auto" playsinline style="width: 100%; height: 100%; object-fit: cover;" />
              </Show>
            </button>
          )}
        </For>
      </div>
      <figcaption innerHTML={current().caption} />
    </figure>
  );
};

export default Collage;
