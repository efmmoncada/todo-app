import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { AppSettings, colorStyle, backgroundStyle } from "../AppSettings";
import ItemList from "../item/ItemList";
import { ScrollView } from "react-native-gesture-handler";

export default function({ tasks, setTasks }) {
    const {darkMode, resetTime, setDarkMode, setResetTime} = useContext(AppSettings)

    const mode = [
        { label: "Light", value: false },
        { label: "Dark", value: true },
    ];

    function getModeStart() {
        if (darkMode) {
            return 1
        }
        else {
            return 0
        }
    }

    const times = [
        { label: "12:00 AM", value: "0000" },
        { label: "1:00 AM", value: "0100" },
        { label: "2:00 AM", value: "0200" },
        { label: "3:00 AM", value: "0300" },
        { label: "4:00 AM", value: "0400" },
    ]

    function getTimeStart() {
        for (var i=0; i<times.length; i++) {
            if (times[i].value === resetTime) {
                return i
            }
        }
    }

    return(
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={[{height: "100%"}, backgroundStyle(darkMode)]}>
            <View style={styles.container}>
                <Text style={[styles.text, colorStyle(darkMode)]}>Tasks reset at: </Text>
                <SwitchSelector
                    options={times}
                    initial={getTimeStart()}
                    onPress={value => setResetTime(value)}
                    backgroundColor={darkMode ? "#757575" : "white"}
                />
            </View>
            <View style={styles.container}>
                <Text style={[styles.text, colorStyle(darkMode)]}>Darkmode:</Text>
                <SwitchSelector
                    options={mode}
                    initial={getModeStart()}
                    onPress={value => setDarkMode(value)}
                    backgroundColor={darkMode ? "#757575" : "white"}
                />
            </View>
            <View style={styles.container}>
                <Text style={[styles.text, colorStyle(darkMode)]}>Edit tasks:</Text>
                <View>
                    <ItemList
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </View>
            </View>
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    container: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
});