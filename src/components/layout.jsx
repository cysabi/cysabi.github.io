import { Motion } from "solid-motionone"
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
  const [pos, setPos] = createSignal({ hide: true })
  const [color, setColor] = createSignal()
  const [hovering, setHovering] = createSignal(false)
  const [pointer, setPointer] = createSignal("auto")

  onMount(() => {
    setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2, hide: true })
    setColor(false)
  })

  for (const msg of [
    "hey there :)",
    "snooping around are we?",
    "don't worry, i don't mind",
    "just remember to leave your shoes at the door !",
  ]) {
    console.info("%c" + msg, "color: #758cec; font-weight: 600;")
  }

  return (
    <GridContext.Provider
      value={{
        pos,
        setPos,
        color,
        setColor,
        hovering,
        setHovering,
        pointer,
        setPointer,
        setHover: (hover = false) => {
          if (hover !== false) {
            setColor("#91e9cb")
            setHovering(hover)
          } else {
            setColor("#7A73B8")
            setHovering(false)
          }
        },
      }}
    >
      <main
        onmousemove={e => {
          setPointer(getComputedStyle(e.target).cursor)
          setPos({ x: e.clientX, y: e.clientY })
        }}
        class="min-h-screen text-slate-50 selection:bg-slate-50 selection:text-slate-950 overflow-x-clip underline-offset-4"
      >
        <Grid />
        {props.children}
      </main>
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
        transition={{ duration: 1.5 }}
        class="fixed inset-0 flex items-start justify-start pointer-events-none overflow-clip -z-10"
      >
        <div
          class="absolute opacity-[0.015] inset-0 bg-repeat bg-center"
          style={`background-image: url('${grid}')`}
        />
        <Motion.div
          animate={{
            x: pos().x - 16,
            y: pos().y - 16,
            backgroundColor: color() || "#7A73B8",
          }}
          transition={
            pos().hide ? { duration: 0 } : { easing: spring({ mass: 0.125 }) }
          }
          class="opacity-40 p-4 absolute hidden sm:block row-start-1 col-start-1 rounded-full"
        />
        <Motion.div
          animate={{
            x: pos().x - (a() ? 16 : 8),
            y: pos().y - (a() ? 16 : 8),
            padding: a() ? "16px" : "8px",
          }}
          transition={
            pos().hide ? { duration: 0 } : { easing: spring({ mass: 0.025 }) }
          }
          class="opacity-40 absolute hidden sm:block row-start-1 col-start-1 rounded-full bg-primary"
        />
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: pos().hide ? 0 : 1 }}
          transition={{ duration: 1.5 }}
          class="fixed inset-0 blur-3xl flex"
        >
          <Blob color={color() || "#aba2fd"} />
          <Blob color="#3b6ea2" main />
        </Motion.div>
      </Motion.div>
    </>
  )
}

const Blob = props => {
  // given a color, return a div that randomly changes opacity, position, and size slightly
  const { pos } = useGrid()
  const [blob, setBlob] = createSignal({ x: 0, y: 0, opacity: 0.1 })
  setInterval(() => {
    setBlob({
      x: Math.random() * 150 - 75,
      y: Math.random() * 150 - 75,
      opacity: pos().hide ? 0 : 0.1,
    })
  }, 750)

  return (
    <Motion.div
      class="absolute"
      animate={{
        x: pos().x,
        y: pos().y,
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
          initial={{ opacity: 0.15 }}
          style={{
            height: props.main ? "520px" : "618px",
            width: props.main ? "520px" : "618px",
          }}
          animate={{ ...blob() }}
          transition={
            pos().hide
              ? { duration: 0 }
              : { easing: spring({ mass: 10, stiffness: 10 }) }
          }
          class="rounded-full"
        >
          <Motion.div
            animate={{ backgroundColor: props.color }}
            transition={pos().hide ? { duration: 0 } : { duration: 0.7 }}
            class="h-full w-full rounded-full"
          />
        </Motion.div>
      </div>
    </Motion.div>
  )
}

export default GridProvider
