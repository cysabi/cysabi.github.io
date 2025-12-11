import { createSignal, For, Match, onMount } from "solid-js";
import { createStore } from "solid-js/store";

const scrambled = [
  "@",
  "!",
  "$",
  "%",
  "*",
  "&",
  "?",
  "/",
  ".",
  ",",
  ":",
  ";",
  "~",
  "+",
  "-",
  "=",
  "<",
  ">",
];

const pickScrambled = () => {
  return scrambled[Math.floor(Math.random() * scrambled.length)];
};

export const CycleText = ({ texts }: { texts: string[] }) => {
  return texts.map((text) => {
    const [scram, setScram] = createStore({
      replace: null as null | string,
      addition: null as null | string,
    });

    // const randomizeCycle = () => {
    document.addEventListener("mousemove", () => {
      if (Math.random() < 0.3) {
        setScram("replace", Math.random() < 0.6 ? null : pickScrambled());
      }
      // setTimeout(randomizeCycle, 2000 + Math.random() * 2000);
      // };
    });
    // randomizeCycle();

    const randomizeCycle = () => {
      setScram("replace", Math.random() < 0.9 ? null : pickScrambled());
      setTimeout(randomizeCycle, 1500 + Math.random() * 1500);
    };
    randomizeCycle();

    return (
      <span
        on:mouseover={() => {
          setScram("addition", pickScrambled());
        }}
      >
        {text === " " ? (
          text
        ) : (
          <>
            <span
              style={{
                color: "#8ba8fd",
              }}
            >
              {scram.replace}
            </span>
            <span>{scram.replace === null && text}</span>
            <span
              style={{
                color: "#8ba8fd",
              }}
            >
              {scram.addition}
            </span>
          </>
        )}
      </span>
    );
  });
};
