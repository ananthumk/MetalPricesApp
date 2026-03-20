import { createContext, useContext, useState } from "react";

const ThemeContext = createContext()

export const themes = {
    light: {
        background: '#F5F5F5',
        card: '#E5E4E2',
        text: '#2A3439',
        subtext: '#888888',
        value: '#2e2e2ec5',
        accent: '#674C47',
        border: '#2a2a2a',
        label: '#080808',
    },
    dark: {
        background: '#121212',
        card: '#1e1e1e',
        text: '#ffffff',
        subtext: '#aaaaaa',
        value: '#ffffff',
        accent: '#FFD700',
        border: '#2a2a2a',
        label: '#aaaaaa',
    }
}

export function ThemeProvider({ children }){
    const [isDark, setIsDark] = useState(false)
    const toggleTheme = () => setIsDark(prev => !prev)
    const theme = isDark ? themes.dark : themes.light

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)