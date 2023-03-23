import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { AppSettings, colorStyle, backgroundStyle } from "../AppSettings";
import Icon from 'react-native-vector-icons/AntDesign'

export default function({tasks, setTasks}) {
    const {darkMode} = useContext(AppSettings)

    function removeItem(name) {
        const new_tasks = tasks.filter((task) => {
            if (task.taskName !== name) {
                return(task)
            }
        })
        setTasks(new_tasks)
    }

    function moveItemUp(name) {
        var new_tasks = [...tasks]
        var target_element_idx = tasks.findIndex((task) => task.taskName === name)
        var swap_idx = target_element_idx-1
        for (swap_idx; swap_idx >= 0; swap_idx--) {
            if (tasks[swap_idx].frequencyType === tasks[target_element_idx].frequencyType) {
                var temp = new_tasks[target_element_idx]
                new_tasks[target_element_idx] = new_tasks[swap_idx]
                new_tasks[swap_idx] = temp
                break
            }
        }
        setTasks(new_tasks)
    }

    function moveItemDown(name) {
        var new_tasks = [...tasks]
        var target_element_idx = tasks.findIndex((task) => task.taskName === name)
        var swap_idx = target_element_idx+1
        for (swap_idx; swap_idx < tasks.length; swap_idx++) {
            if (tasks[swap_idx].frequencyType === tasks[target_element_idx].frequencyType) {
                var temp = new_tasks[target_element_idx]
                new_tasks[target_element_idx] = new_tasks[swap_idx]
                new_tasks[swap_idx] = temp
                break
            }
        }
        setTasks(new_tasks)
    }

    function ItemElement(name) {
        return(
            <View key={name} style={styles.itemContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.positionButton, styles.buttonIcon]} onPress={() => moveItemUp(name)}>
                        <Icon style={styles.arrowIcon} name="caretup"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.positionButton, styles.buttonIcon]} onPress={() => moveItemDown(name)}>
                        <Icon style={styles.arrowIcon} name="caretdown"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.deleteButton, styles.buttonIcon]}  onPress={() => removeItem(name)}>
                        <Icon style={styles.deleteIcon} name="close" size={40}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function ifCorrectFrequency(task, frequency) {
        if (task.frequencyType === frequency) {
            return(ItemElement(task.taskName))
        } else {
            return
        }
    }

    function dailySortingLabel() {
        const nTasks = tasks.filter((task) => {return(task.frequencyType === "Day")}).length

        if (nTasks > 0) {
            return(
                <Text style={[styles.labelText, colorStyle(darkMode)]}>Daily</Text>
            )
        }
    }

    function weeklySortingLabel() {
        const nTasks = tasks.filter((task) => {return(task.frequencyType === "Week")}).length

        if (nTasks > 0) {
            return(
                <Text style={[styles.labelText, colorStyle(darkMode)]}>Weekly</Text>
            )
        }
    }

    function monthlySortingLabel() {
        const nTasks = tasks.filter((task) => {return(task.frequencyType === "Month")}).length

        if (nTasks > 0) {
            return(
                <Text style={[styles.labelText, colorStyle(darkMode)]}>Monthly</Text>
            )
        }
    }

    return(
        <View style={styles.container}>
            {dailySortingLabel()}
            {tasks.map((task) => ifCorrectFrequency(task, "Day"))}

            {weeklySortingLabel()}
            {tasks.map((task) => ifCorrectFrequency(task, "Week"))}

            {monthlySortingLabel()}
            {tasks.map((task) => ifCorrectFrequency(task, "Month"))}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
    },
    labelText: {
        fontSize: 20,
    },
    container: {
        justifyContent: "center",
    },
    itemContainer: {
        height: 70,
        marginVertical: 2,
        flexDirection: "row"
    },
    buttonIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    arrowIcon: {
        color: "#595959",
    },
    deleteIcon: {
        color: "#ff9999",
    },
    buttonContainer: {
    },
    nameContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingLeft: 10,
        marginVertical: 3,
        borderRadius: 5,
        backgroundColor: "#ffeecc",
    },
    positionButton: {
        aspectRatio: 1,
        flexGrow: 1,
        backgroundColor: "#d9d9d9",
        margin: 3,
        borderRadius: 5,
    },
    deleteButton: {
        aspectRatio: 1,
        flexGrow: 1,
        backgroundColor: "red",
        margin: 3,
        borderRadius: 5,
    },
});