import {
  createSignal,
  createContext,
  useContext,
  onCleanup,
  onMount,
} from "solid-js"
import { spring } from "motion"
import { Motion } from "@motionone/solid"
import grid from "../static/grid.svg"

const GridContext = createContext()

export const GridProvider = props => {
  const [pos, setPos] = createSignal({ x: 400, y: 400 })
  const [color, setColor] = createSignal("#7A73B8")

  return (
    <GridContext.Provider value={{ pos, setPos, color, setColor }}>
      {props.children}
    </GridContext.Provider>
  )
}

export const useGrid = () => {
  return useContext(GridContext)
}

const Grid = () => {
  const { pos, color } = useGrid()
  return (
    <>
      <div class="fixed inset-0 pointer-events-none flex items-start justify-start z-50">
        <Motion.div
          animate={{
            x: pos().x - 16,
            y: pos().y - 16,
            backgroundColor: color() || "#7A73B8",
          }}
          transition={{ easing: spring({ mass: 0.1 }) }}
          class="absolute hidden sm:block opacity-[calc(1/3)] row-start-1 col-start-1 rounded-full py-4 px-4"
        />
        <Motion.div
          animate={{
            x: pos().x - 8,
            y: pos().y - 8,
          }}
          transition={{ easing: spring({ mass: 0.025 }) }}
          class="absolute hidden sm:block opacity-[calc(1/3)] row-start-1 col-start-1 rounded-full py-2 px-2 bg-primary"
        />
      </div>
      <div class="fixed inset-0 blur-[96px] -z-10 overflow-hidden flex">
        <Blob pos={pos} color={color() || "#7A73B8"} />
        <Blob pos={pos} color="#3b6ea2" main />
      </div>
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
  onMount(() => {
    const interval = setInterval(() => {
      setBlob({
        x: Math.random() * 150 - 75,
        y: Math.random() * 150 - 75,
        opacity: props.main
          ? Math.random() / (4 / 3) + 0.25
          : Math.random() / 2 + 0.5,
      })
    }, 750)
    onCleanup(() => clearInterval(interval))
  })
  return (
    <Motion.div
      class="absolute opacity-0"
      animate={{
        x: props.pos().x,
        y: props.pos().y,
        opacity: 1 / 3,
      }}
      transition={{
        easing: spring({
          mass: 1.5,
          damping: 100,
          stiffness: props.main ? 120 : 80,
        }),
      }}
    >
      <div class="left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Motion.div
          animate={{ ...blob() }}
          transition={{ easing: spring({ mass: 10, stiffness: 10 }) }}
          class="h-[640px] rounded-full aspect-square"
        >
          <Motion.div
            animate={{ backgroundColor: props.color }}
            transition={{ duration: 0.7 }}
            class="h-full w-full rounded-full aspect-square"
          />
        </Motion.div>
      </div>
    </Motion.div>
  )
}

export default Grid
