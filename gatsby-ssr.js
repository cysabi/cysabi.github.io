import React from "react"
import { DarkModeProvider } from "./src/components/DarkMode"

export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
)
