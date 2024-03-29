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
        class="relative min-h-screen overflow-clip flex flex-col"
      >
        {location.pathname === "/" || (
          <div class="flex items-center flex-wrap font-medium p-8 gap-12">
            <A href="/" class="text-2xl">
              cysabi
            </A>
            <div class="text-xl flex items-center gap-8">
              <A href="/#works">works</A>
              <A href="/#contact">contact</A>
            </div>
          </div>
        )}
        <div class="flex-1">
          <Outlet />
        </div>
        <div class="bg-slate-900/50 border-t-4 border-slate-700/25 backdrop-blur flex flex-col gap-8 mt-[min(10vw,128px)] p-12">
          <div class="flex items-center justify-between flex-wrap gap-12 w-full">
            <div class="text-slate-500 text-center">
              like what you see?{" "}
              <A
                href="/#contact"
                onClick={() => window.scrollTo(0, 0)}
                class="text-slate-400 decoration-transparent"
              >
                contact me!
              </A>
            </div>
            <div class="text-slate-500">
              built with{" "}
              <a
                href="https://solidjs.com"
                class="text-slate-400 decoration-transparent"
              >
                solidjs
              </a>{" "}
              (
              <a
                href="https://vitejs.dev"
                class="text-slate-400 decoration-transparent"
              >
                vite
              </a>
              ) &{" "}
              <a
                href="https://tailwindcss.com"
                class="text-slate-400 decoration-transparent"
              >
                tailwind
              </a>
              <span class="px-3 font-mono font-black text-slate-600 -tracking-widest">
                //
              </span>
              <a
                href="https://github.com/LeptoFlare/LeptoFlare.github.io"
                class="text-slate-400 decoration-transparent"
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
