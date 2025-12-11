import { createSignal } from "solid-js";

const Title = () => {
  const [title, setTitle] = createSignal<string>("0 / 0");

  if (typeof window !== "undefined")
    document.addEventListener("mousemove", (e) => {
      setTitle(`${e.clientX} / ${e.clientY}`);
    });

  return title;
};

export default Title;
