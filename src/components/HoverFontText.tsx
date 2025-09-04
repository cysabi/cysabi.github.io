import { createMemo, createSignal } from "solid-js";

export const HoverFontChar = ({ char }: { char: string }) => {
  const [hovered, setHovered] = createSignal(false);
  const fontFamily = createMemo(() => (hovered() ? "'Drafting*'" : "'Sono'"));

  return (
    <span
      on:mouseenter={() => setHovered(!hovered())}
      // on:mouseleave={() => setHovered(false)}
      style={{ "font-family": fontFamily() }}
    >
      {char}
    </span>
  );
};
