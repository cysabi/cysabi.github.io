import { Route, Router } from "@solidjs/router"
import { render, renderToString } from "solid-js/web"
import Layout from "./components/layout"
import Index from "./routes/index"
import "./root.css"

const App = () => (
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
)

if (typeof window !== "undefined") {
  render(App, document.getElementById("root"))
}

// export const app = renderToString(App)
