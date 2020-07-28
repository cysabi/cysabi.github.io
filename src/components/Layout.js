import React from "react"
import SEO from "./SEO"

const Layout = ({ pageTitle, children }) => (
  <>
    <SEO title={pageTitle} />
    <div>{children}</div>
  </>
)

export default Layout
