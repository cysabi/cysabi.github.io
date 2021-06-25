import React from "react"

const DarkModeContext = React.createContext()

export const useDarkMode = () => {
  const context = React.useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a CountProvider")
  }
  return context
}

export const DarkModeProvider = ({ children }) => {
  const [enabled, setEnabled] = React.useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  )

  return (
    <DarkModeContext.Provider
      value={{ enabled, toggle: () => setEnabled(!enabled) }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}
