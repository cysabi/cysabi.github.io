import { For, Show } from "solid-js";
import { hoveredWork, TAGS, toggleTag, type Work } from "./sharedState";
import Toc from "./Toc";

const phrases = [
  "daydreaming",
  "constructing elaborate situations in their head",
  "mourning the past",
  "a triple-a battery",
  "playing splatoon",
  "being compared to cats",
  "apologizing in advance for missing that social cue",
  "thinking about thinking",
  "browsing domain names to buy and not use",
  "... uh... i forgot",
  "looking over a bridge",
  "being asked why their font size is so small",
  "buried underneath their covers and pillows",
  "in another castle",
  "stuck in an artist block",
  "staying up way too late",
  "printing stickers",
  "gossiping in chinese to their friends in public",
  "flipping through all of their artbooks",
  "listening to only the piano section of a song",
  "trying (and failing) to ride a bike",
  "grateful for their friends",
  "acting veeery suspicious right now",
  "forgetting their water bottle",
  "definitely not asleep right now",
  "looking at the stars from the top of a small hill",
  "evil today",
  "feeling so much sonder",
  "full of sonder",
  "thinking about syntropy",
  "looking at camper vans they will never buy",
  "ordering 25% sugar, less ice",
  "having fun losing to their friends in a game",
  "tinkering",
  "asking their friends to stream on discord",
  "nodding along (still doesn't get it)",
  "eating all of their friends' leftovers",
  "wearing too many layers in spring",
  "hitting snooze one too many times",
  "overthinking a new project name",
  "looping their new favorite song",
  "sitting on a fire escape",
  "dreaming about vertical cities",
  "stunlocked by nostalgia",
  "urban exploring",
];

export const About = (props: { work?: Work }) => {
  const first = Math.floor(Math.random() * phrases.length);
  const second =
    (first + 1 + Math.floor(Math.random() * (phrases.length - 1))) %
    phrases.length;

  return (
    <div style="position: sticky; top: 4ch; align-self: start; height: calc(100svh - 8ch); display: flex; flex-direction: column;">
      <div style="display: flex; flex-direction: column; gap: 2ch;">
        <div style="font-family: var(--font-main); color: var(--blurple);">
          <div style="font-size: 1.2em;">@ cyrene | cysabi
            <Show when={props.work}>
              <span style="color: var(--color-text-subtle);"> # </span>
              <span style="color: var(--pink);">{props.work?.name}</span>
            </Show>
          </div>
          <Show when={props.work} fallback={
            <div style="font-size: 0.85em; font-style: italic; color: var(--color-text-subtle);">
              is <span style="color: var(--purple);">{phrases[first]}</span> and <span style="color: var(--purple);">{phrases[second]}</span>
            </div>
          }>
            <div style="color: var(--pink);">
              {props.work?.subtitle}
            </div>
          </Show>
        </div>
        <Show when={props.work} fallback={
          <Show when={hoveredWork()} fallback={<>
            <div>
              hi there! i'm a self-taught designer & hacker, i love thinking about
              people and how they interact with the world (and others!)
            </div>
            <div>
              i'm an alumni of <a href="https://recurse.com">{`recurse center`}</a>{" "}
              <a href="https://ring.recurse.com/rand">{`[wr]`}</a>. which is my favorite
              place in the world
            </div>
            <div>
              i also tend a digital <a>/bookshelf</a>
            </div>
            <div>
              dont be shy to say hello! you can shoot me an email at <span>firstname@domain</span>
            </div>
          </>}>
            {(work) => (
              <For each={work().desc}>{(para) => <p>{para}</p>}</For>
            )}
          </Show>
        }>
          {(work) => (
            <>
              <h1>{work().name}</h1>
              <Show when={work().tags.length}>
                <ul style="display: flex; gap: 1ch; list-style: none">
                  <For each={work().tags}>{(tag) => <li>{tag}</li>}</For>
                </ul>
              </Show>
              <Show when={work().subtitle}>{(subtitle) => <p>{subtitle()}</p>}</Show>
              <Show when={Object.keys(work().sources).length}>
                <ul style="display: flex; gap: 1ch; list-style: none">
                  <For each={Object.entries(work().sources)}>{([label, href]) =>
                    <li><a href={href}>{label}</a></li>
                  }</For>
                </ul>
              </Show>
              <Toc desc={work().desc} />
            </>
          )}
        </Show>
      </div>
      <div style="margin-top: auto;">
        <Show when={hoveredWork()?.preview}>
          {(preview) => (
            <img
              aria-hidden="true"
              src={preview()}
              style="width: 100%; margin-bottom: 2ch;"
            />
          )}
        </Show>
        <Show when={props.work} fallback={
          <div>
            filter by{" "}
            <For each={TAGS}>{(tag, i) =>
              <>
                {i() ? ", " : ""}
                <button onClick={() => toggleTag(tag)}>{tag}</button>
              </>
              }</For>
          </div>
        }>
          <div>
            <a href="/">back to home</a>
          </div>
        </Show>
        <div style="color: var(--color-text-subtle); font-size: 0.875em;">
          forever in progress! last updated {__LAST_UPDATED__}
        </div>
      </div>
    </div>
  );
};

export default About;
