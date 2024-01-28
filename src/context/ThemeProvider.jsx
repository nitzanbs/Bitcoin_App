import React, {createContext, useState} from "react";

export const ThemeContext = createContext();


export default function ThemeProvider({children}) {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const darkModeColors ={
        background: "#211f1f",
        color: "#fff",

    }
    const lightModeColors ={
        background: "#afd5d7",
        color: "#211f1f",
    }

    const [selectedTheme, setSelectedTheme] = useState(lightModeColors)
    
    
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        setSelectedTheme(isDarkMode? darkModeColors : lightModeColors)
    }

  return ( 
    <ThemeContext.Provider value={{toggleTheme, isDarkMode, selectedTheme}}>
        {children}
    </ThemeContext.Provider>
  );
}
