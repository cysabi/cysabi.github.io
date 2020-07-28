import React from "react"
import SEO from "./SEO"

const Layout = ({ pageTitle, children }) => (
  <>
    <SEO title={pageTitle} />
    <div class="content">{children}</div>
  </>
)

export default Layout
