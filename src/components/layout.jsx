import { onMount } from "solid-js"
import { A, Outlet, useLocation } from "@solidjs/router"
import Grid, { useGrid } from "./grid"

const Layout = () => {
  const location = useLocation()
  const { setPos, setColor } = useGrid()
  onMount(() => {
    setColor(false)
  })
  let wait = false
  return (
    <>
      <main
        onmousemove={e => {
          if (!wait) {
            wait = true
            setTimeout(() => {
              wait = false
            }, 100)
            setPos({ x: e.clientX, y: e.clientY })
          }
        }}
        class="relative min-h-screen overflow-hidden flex flex-col"
      >
        {location.pathname === "/" || (
          <div class="flex items-center font-medium p-8 gap-12">
            <A href="/" class="text-2xl">
              cysabi
            </A>
            <div class="text-xl flex items-center gap-8">
              <A href="/#about">about</A>
              {/* <A href="/#works">works</A> */}
              <A href="/#contact">contact</A>
            </div>
          </div>
        )}
        <div class="flex-1">
          <Outlet />
        </div>
        <div class="bg-slate-900/50 border-t-4 border-slate-700/25 backdrop-blur-xl flex flex-col gap-8 mt-[min(10vw,128px)] p-12">
          <div class="flex items-center justify-between gap-4 w-full">
            <div class="text-slate-500 text-center">
              like what you see?{" "}
              <A href="/#contact" class="text-slate-400">
                contact me!
              </A>
            </div>
            <div class="text-slate-500 text-center">
              built with{" "}
              <a href="https://solidjs.com" class="text-slate-400">
                solidjs
              </a>{" "}
              (
              <a href="https://vitejs.dev" class="text-slate-400">
                vite
              </a>
              ) &{" "}
              <a href="https://tailwindcss.com" class="text-slate-400">
                tailwind
              </a>
              <span class="font-medium text-white px-3">/</span>
              <a
                href="https://github.com/LeptoFlare/LeptoFlare.github.io"
                class="text-slate-400"
              >
                source code
              </a>
            </div>
          </div>
        </div>
      </main>
      <Grid />
    </>
  )
}

export default Layout
