import { createContext, useState } from 'react';

const AppSettings = createContext();

function AppSettingsProvider(props) {
    const [darkMode, setDarkMode] = useState(false)
    const [resetTime, setResetTime] = useState("0000")

    return(
        <AppSettings.Provider value={{darkMode, resetTime, setDarkMode, setResetTime}}>
            {props.children}
        </AppSettings.Provider>
    )
}

function colorStyle(darkMode) {
    if (darkMode) {
        return({
            color: "#d9d9d9",
        })
    } else {
        return({
            color: "black",
        })
    }
}

function backgroundStyle(darkMode) {
    if (darkMode) {
        return({
            backgroundColor: "#757575",
        })
    } else {
        return({
            backgroundColor: "white",
        })
    }
}

export {AppSettings, AppSettingsProvider, colorStyle, backgroundStyle}

