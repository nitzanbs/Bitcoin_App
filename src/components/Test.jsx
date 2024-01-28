import React, {useContext} from "react";
import {ThemeContext} from "../context/ThemeProvider";

import React from 'react'

export default function Test() {

    const {isDarkMode, toggleTheme, selectedTheme} = useContext(ThemeContext);

    console.log(isDarkMode);
  return (
    <div style={{...selectedTheme}} >


    
    </div>
  )
}
