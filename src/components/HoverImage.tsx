import { createSignal } from "solid-js";

export const [hovered, setHoverImage] = createSignal<null | string>(null);

export const HoverImage = () => {
  return <div>{hovered()}</div>;
};

export const Project = ({ name }: { name: string }) => {
  return (
    <div
      class="project"
      style={{
        padding: "calc(2ch - 2px)",
        border: "1px solid hsl(from var(--color-text-subtle) h s l / 0.25)",
      }}
      on:mouseenter={() => setHoverImage(name)}
      on:mouseleave={() => setHoverImage(null)}
    >
      {name}
    </div>
  );
};
