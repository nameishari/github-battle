import * as React from 'react'

const ThemeContext = React.createContext("light")

export default ThemeContext
export const ThemeProvider = ThemeContext.Provider
