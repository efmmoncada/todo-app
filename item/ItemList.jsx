import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { AppSettings, colorStyle, backgroundStyle } from "../AppSettings";
import Icon from 'react-native-vector-icons/AntDesign'

export default function({tasks, setTasks}) {
    return(
        <View style={styles.container}>
            {tasks.map((task) => ItemElement(task.taskName))}
        </View>
    )
}

function ItemElement(name) {
    return(
        <View style={styles.itemContainer}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.positionButton, styles.buttonIcon]}>
                    <Icon style={styles.arrowIcon} name="caretup"/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.positionButton, styles.buttonIcon]}>
                    <Icon style={styles.arrowIcon} name="caretdown"/>
                </TouchableOpacity>                 
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.deleteButton, styles.buttonIcon]}>
                    <Icon style={styles.deleteIcon} name="close" size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
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