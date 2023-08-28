import { Motion } from "@motionone/solid"
import { spring } from "motion"
import {
  createContext,
  createMemo,
  createSignal,
  onMount,
  useContext,
} from "solid-js"
import grid from "../static/grid.svg"

const GridContext = createContext()

export const GridProvider = props => {
  const [color, setColor] = createSignal("#7A73B8")
  const [pointer, setPointer] = createSignal("auto")
  const [pos, setPos] = createSignal({ hide: true })
  const [hiddenTopics, setHiddenTopics] = createSignal([])
  onMount(() =>
    setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2, hide: true })
  )

  return (
    <GridContext.Provider
      value={{
        pos,
        setPos,
        color,
        setColor,
        pointer,
        setPointer,
        hiddenTopics,
        toggleTopic: topic =>
          hiddenTopics().includes(topic)
            ? setHiddenTopics(hiddenTopics().filter(t => t !== topic))
            : setHiddenTopics([...hiddenTopics(), topic]),
      }}
    >
      {props.children}
    </GridContext.Provider>
  )
}

export const useGrid = () => {
  return useContext(GridContext)
}

const Grid = () => {
  const { pos, color, pointer } = useGrid()
  const a = createMemo(() => pointer() === "pointer")
  return (
    <>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: pos().hide ? 0 : 1 }}
        transition={{ duration: 1 }}
        class="fixed inset-0 pointer-events-none flex items-start justify-start -z-10"
      >
        <Motion.div
          animate={{
            x: pos().x - 16,
            y: pos().y - 16,
            padding: "16px",
            opacity: a() ? 0.4 : 0.4,
            backgroundColor: color() || "#7A73B8",
          }}
          transition={{ easing: spring({ mass: 0.125 }) }}
          class="absolute hidden sm:block row-start-1 col-start-1 rounded-full"
        />
        <Motion.div
          animate={{
            x: pos().x - (a() ? 16 : 8),
            y: pos().y - (a() ? 16 : 8),
            padding: a() ? "16px" : "8px",
            opacity: a() ? 0.4 : 0.4,
          }}
          transition={{ easing: spring({ mass: 0.025 }) }}
          class="absolute hidden sm:block row-start-1 col-start-1 rounded-full bg-primary"
        />
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: pos().hide ? 0 : 0.25 }}
        transition={{ duration: 1 }}
        class="fixed inset-0 blur-[96px] -z-10 flex overflow-hidden"
      >
        <Blob pos={pos} color={color() || "#7A73B8"} />
        <Blob pos={pos} color="#3b6ea2" main />
      </Motion.div>
      <div
        class="absolute opacity-[0.015] inset-0 -z-10 bg-repeat bg-center"
        style={`background-image: url('${grid}')`}
      />
    </>
  )
}

const Blob = props => {
  // given a color, return a div that randomly changes opacity, position, and size slightly
  const [blob, setBlob] = createSignal({ x: 0, y: 0, opacity: 0.5 })
  setInterval(() => {
    setBlob({
      x: Math.random() * 150 - 75,
      y: Math.random() * 150 - 75,
      opacity: props.main
        ? Math.random() / (4 / 3) + 0.25
        : Math.random() / 2 + 0.5,
    })
  }, 750)

  return (
    <Motion.div
      class="absolute"
      animate={{
        x: props.pos().x,
        y: props.pos().y,
      }}
      transition={{
        easing: spring({
          mass: props.main ? 1 : 2,
          damping: 100,
        }),
      }}
    >
      <div class="left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Motion.div
          animate={{ ...blob() }}
          transition={{ easing: spring({ mass: 10, stiffness: 10 }) }}
          class="h-[640px] w-[640px] rounded-full"
        >
          <Motion.div
            animate={{ backgroundColor: props.color }}
            transition={{ duration: 0.7 }}
            class="h-full w-full rounded-full"
          />
        </Motion.div>
      </div>
    </Motion.div>
  )
}

export default Grid
