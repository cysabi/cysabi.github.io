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
  const [enabled, setEnabled] = React.useState()

  React.useEffect(() => {
    setEnabled(
      localStorage.darkModeEnabled === "true" ||
        (!("darkModeEnabled" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  }, [])

  const toggle = () => {
    localStorage.darkModeEnabled = (!enabled).toString()
    setEnabled(!enabled)
  }

  return (
    <DarkModeContext.Provider value={{ enabled, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}
