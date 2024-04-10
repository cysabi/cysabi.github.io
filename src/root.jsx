import { Route, Router } from "@solidjs/router"
import { render } from "solid-js/web"
import Layout from "./components/grid"
import Index from "./routes/index"
import "./root.css"

export default Layout

render(
  () => (
    <Router>
      <Route
        path="/"
        component={() => (
          <Layout>
            <Index />
          </Layout>
        )}
      />
    </Router>
  ),
  document.getElementById("root")
)
