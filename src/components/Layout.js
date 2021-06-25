import React from "react"

import SEO from "./SEO"
import { useDarkMode } from "./DarkMode"

const Layout = ({ title, children }) => {
  const darkMode = useDarkMode()
  return (
    <div className={darkMode.enabled ? "dark" : undefined}>
      <SEO title={title} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
