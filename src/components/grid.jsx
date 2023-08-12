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
      <div class="fixed blur-3xl inset-0 -z-10 overflow-hidden">
        <CursorBlob pos={pos} color={color} />
      </div>
      <div
        class="absolute opacity-[0.015] inset-0 -z-10 bg-repeat bg-center min-h-[600px]"
        style={`background-image: url('${grid}')`}
      />
    </>
  )
}

const CursorBlob = props => {
  return (
    <Motion.div
      class="relative opacity-0"
      animate={{
        x: props.pos().x - 250,
        y: props.pos().y - 250,
        opacity: 1 / 3,
      }}
      transition={{ easing: spring({ mass: 2, damping: 100 }) }}
    >
      <Blob color={props.color() || "#7A73B8"} />
      <Blob color="#3b6ea2" main />
    </Motion.div>
  )
}

const Blob = props => {
  // given a color, return a div that randomly changes opacity, position, and size slightly
  const [blob, setBlob] = createSignal({
    x: Math.random() * 300 - 150,
    y: Math.random() * 300 - 150,
    opacity: Math.random(),
  })
  onMount(() => {
    const interval = setInterval(() => {
      setBlob({
        x: Math.random() * 250 - 125,
        y: Math.random() * 250 - 125,
        opacity: props.main ? Math.random() : Math.random() / 2 + 0.5,
      })
    }, 750)
    onCleanup(() => clearInterval(interval))
  })
  return (
    <Motion.div
      animate={{ ...blob() }}
      transition={{ easing: spring({ mass: 170, damping: 170 }) }}
      class="absolute h-[500px] rounded-full aspect-square"
    >
      <Motion.div
        animate={{ backgroundColor: props.color }}
        transition={{ duration: 0.7 }}
        class="h-full w-full rounded-full aspect-square"
      />
    </Motion.div>
  )
}

export default Grid
