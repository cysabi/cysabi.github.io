import { render } from "solid-js/web"
import { Route, Router, Routes } from "@solidjs/router"
import Index from "./routes/index"
import Works, { works } from "./routes/works/index"
import WorkTemplate, { CaseDivider, Collage, Img } from "./components/work"
import { GridProvider } from "./components/grid"
import Layout from "./components/layout"
import "./root.css"

render(
  () => (
    <GridProvider>
      <Router>
        <Routes>
          <Route path="/" component={Layout}>
            <Route path="/" component={Index} />
            <Route path="/works" component={Works} />
            {works.map(Work => (
              <Route
                path={"/works/" + Work.data.name}
                element={
                  <WorkTemplate {...Work.data}>
                    <Work.default
                      components={{ img: Img, CaseDivider, Collage }}
                    />
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
