import React from "react"
import "@fontsource/work-sans/400.css"
import "@fontsource/work-sans/400-italic.css"
import "@fontsource/work-sans/600.css"
import "@fontsource/work-sans/600-italic.css"
import "@fontsource/trispace/300.css"

import "./src/static/global.css"

import { DarkModeProvider } from "./src/components/DarkMode"

export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
)
