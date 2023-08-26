import { Route, Router, Routes } from "@solidjs/router"
import { render } from "solid-js/web"
import { GridProvider } from "./components/grid"
import Layout from "./components/layout"
import WorkTemplate from "./components/work"
import "./root.css"
import Index from "./routes/index"
import Works, { works } from "./routes/works/index"

render(
  () => (
    <GridProvider>
      <Router>
        <Routes>
          <Route path="/" component={Layout}>
            <Route path="/" component={Index} />
            <Route path="/works" component={Works} />
            {works.map(work => (
              <Route
                path={"/works/" + work.data.name}
                element={<WorkTemplate {...work} />}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </GridProvider>
  ),
  document.getElementById("root")
)
