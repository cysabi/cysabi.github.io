import { createSignal } from "solid-js";
import type { CollectionEntry } from "astro:content";

export type Work = CollectionEntry<"works">["data"];

// every tag, hard coded — this is also the order they render in
export const TAGS = [
  "selected",
  "game",
  "site",
  "lib",
  "broadcast",
  "font",
];

export const [hoveredWork, setHoveredWork] = createSignal<Work | null>(null);
export const [hoveredTag, setHoveredTag] = createSignal<string | null>(null);
export const [filter, setFilter] = createSignal<string[]>([]);
export const [archives, setArchives] = createSignal(false);

export const toggleTag = (tag: string) =>
  setFilter((prev) =>
    prev.includes(tag) ? prev.filter((it) => it !== tag) : [...prev, tag]
  );
