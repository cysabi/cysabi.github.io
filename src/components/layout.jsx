import { onMount } from "solid-js"
import { A, Outlet, useLocation } from "@solidjs/router"
import Grid, { useGrid } from "./grid"

const Layout = () => {
  const { setPos, setColor } = useGrid()
  const location = useLocation()
  onMount(() => {
    setColor(false)
  })
  return (
    <>
      <main
        onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
        class="relative min-h-screen overflow-hidden"
      >
        {location.pathname === "/" || (
          <div class="flex items-center font-medium p-8 gap-12">
            <A
              href="/"
              class="text-2xl underline decoration-2 decoration-transparent hover:decoration-slate-400 transition-colors"
            >
              cerusabi
            </A>
            <div class="text-xl flex items-center gap-8">
              <A
                href="/#about"
                class="underline decoration-2 decoration-transparent hover:decoration-slate-400 transition-colors"
              >
                about
              </A>
              <A
                href="/works"
                class="underline decoration-2 decoration-transparent hover:decoration-slate-400 transition-colors"
              >
                works
              </A>
            </div>
          </div>
        )}
        <Outlet />
        <div class="bg-gray-800/50 border-t-4 border-gray-700/25 backdrop-blur-3xl flex flex-col gap-8 p-12">
          <div class="flex items-center gap-4 w-full">
            <div class="text-slate-500 text-center">
              built with{" "}
              <a
                href="https://solidjs.com"
                class="text-slate-400 hover:underline"
              >
                solidjs
              </a>{" "}
              (
              <a
                href="https://vitejs.dev"
                class="text-slate-400 hover:underline"
              >
                vite
              </a>
              ) &{" "}
              <a
                href="https://tailwindcss.com"
                class="text-slate-400 hover:underline"
              >
                tailwind
              </a>
              ,{" "}
              <a
                href="https://github.com/LeptoFlare/LeptoFlare.github.io"
                class="text-slate-400 hover:underline"
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
