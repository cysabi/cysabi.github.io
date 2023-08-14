import { render } from "solid-js/web"
import { A, Outlet, Route, Router, Routes } from "@solidjs/router"
import Grid, { GridProvider, useGrid } from "./components/grid"
import Index from "./routes/index"
import Works, { works } from "./routes/works/index"
import WorkTemplate from "./routes/works/_template"
import "./root.css"
import { onMount } from "solid-js"
import Img from "./components/img"

const Root = props => {
  const { setPos, setColor } = useGrid()
  onMount(() => {
    setColor(false)
  })
  return (
    <>
      {props.main === true || (
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
      <main
        onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
        class="relative min-h-screen overflow-hidden"
      >
        <Outlet />
        {props.children}
        <div class="flex flex-col gap-8 max-w-7xl mx-auto p-[min(10vw,128px)]">
          <div class="flex items-center gap-4 w-full">
            <div class="flex-1 h-0.5 bg-slate-50 rounded-full" />
          </div>
          <div class="text-slate-400 text-center">
            built with{" "}
            <a
              href="https://solidjs.com"
              class="text-slate-200 hover:underline"
            >
              solidjs
            </a>{" "}
            (
            <a href="https://vitejs.dev" class="text-slate-200 hover:underline">
              vite
            </a>
            ) &{" "}
            <a
              href="https://tailwindcss.com"
              class="text-slate-200 hover:underline"
            >
              tailwind
            </a>
            ,{" "}
            <a
              href="https://github.com/LeptoFlare/LeptoFlare.github.io"
              class="text-slate-200 hover:underline"
            >
              source code
            </a>
          </div>
        </div>
      </main>
      <Grid />
    </>
  )
}

render(
  () => (
    <GridProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Root main={true}>
                <Index />
              </Root>
            }
          />
          <Route path="/" component={Root}>
            <Route path="/works" component={Works} />
            {works.map(Work => (
              <Route
                path={"/works/" + Work.data.name}
                element={
                  <WorkTemplate {...Work.data}>
                    <Work.default components={{ img: Img }} />
                  </WorkTemplate>
                }
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </GridProvider>
  ),
  document.getElementById("root")
)
