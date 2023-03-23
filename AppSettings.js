import { createContext, useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppSettings = createContext();

function AppSettingsProvider(props) {
    const [darkMode, setDarkMode] = useState(false)
    const [resetTime, setResetTime] = useState("0000")

    const getContextFromStorage = async () => {
        try {
          const json = await AsyncStorage.getItem("@context");
          if (!json) throw new Error("Could not read data from storage");
          const data = JSON.parse(json);
          return data;
        } catch (e) {
          console.log(e);
        }
    }

    const writeContextToStorage = async (data) => {
        try {
          const json = JSON.stringify(data);
          if (!json) return;
          await AsyncStorage.setItem("@context", json);
        } catch (e) {
          console.log(e);
        }
    }

    useEffect(() => {
        getContextFromStorage()
          .then(data => {
            setDarkMode(data["darkMode"] || false);
            setResetTime(data["resetTime"] || "0000");
            console.log(data)})
          .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        data = {
            "darkMode": darkMode,
            "resetTime": resetTime,
        }
        writeContextToStorage(data);
    }, [darkMode, resetTime]);

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

