import { A, Outlet, useLocation } from "@solidjs/router"
import { onMount } from "solid-js"
import Grid, { useGrid } from "./grid"

const Layout = () => {
  const location = useLocation()
  ;[
    "hey there :)",
    "snooping around are we?",
    "don't worry, i don't mind",
    "just remember to put everything back where you found it !",
  ].map(text => {
    console.log("%c" + text, "color: #8dadff; font-weight: 600;")
  })
  const { setPos, setColor, setPointer } = useGrid()
  onMount(() => {
    setColor(false)
  })
  return (
    <>
      <main
        onmousemove={e => {
          setPointer(getComputedStyle(e.target).cursor)
          setPos({ x: e.clientX, y: e.clientY })
        }}
      >
        <Outlet />
      </main>
      <Grid />
    </>
  )
}

export default Layout
