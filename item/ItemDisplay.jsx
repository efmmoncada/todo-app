import React, { useState, useContext } from "react";
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import { Keyboard } from "react-native";
import { AppSettings, colorStyle } from "../AppSettings";

export default function ItemDisplay(props) {
    const {darkMode} = useContext(AppSettings)

    const [expanded, setExpanded] = useState(false)
    const [taskName, setName] = useState(props.taskName)
    const [taskCompleted, setCompleted] = useState(props.nCompleted)
    const [taskGoal, setGoal] = useState(props.nGoal)

    if (expanded) {
      return (
        <View>
          <View style={taskCompleted==taskGoal ? styles.containerComplete : styles.container}>
            <TouchableOpacity style={[styles.clickableContainer, {flexGrow: 1}]} onPress={() => incrementData(props, setCompleted)}>
              {taskCompleted==taskGoal ? 
                <Text style={[styles.text, {width: 75}]}><Icon name="check" size={40} /></Text> : 
                <Text style={[styles.text, {width: 75}]}>{props.nCompleted}/{props.nGoal}</Text>}
                <Text style={[styles.text, {flexGrow: 2, textAlign: "left"}]}>{props.taskName}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickableContainer} onPress={() => editData(expanded, setExpanded)}>
                <Text style={[styles.text, {width: 75}]}>
                  <Icon name="caretdown" size={20} />
                </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: "center"}}>
            <View style={styles.itemControlContainer}>
              <Text style={[styles.labelText, colorStyle(darkMode)]}>Task Name:</Text>
              <TextInput id="name" style={[styles.textBox, colorStyle(darkMode)]} onChangeText={(text) => setName(text)}>{props.taskName}</TextInput>
            </View>
            <View style={styles.itemControlContainer}>
              <Text style={[styles.labelText, colorStyle(darkMode)]}>Completed:</Text>
              <TextInput id="completed" keyboardType = 'numeric' style={[styles.textBox, colorStyle(darkMode)]} onChangeText={(text) => setCompleted(text)}>{props.nCompleted}</TextInput>
            </View>
            <View style={styles.itemControlContainer}>
              <Text style={[styles.labelText, colorStyle(darkMode)]}>Goal:</Text>
              <TextInput id="goal" keyboardType = 'numeric' style={[styles.textBox, colorStyle(darkMode)]} onChangeText={(text) => setGoal(text)}>{props.nGoal}</TextInput>
            </View>
            <View style={styles.itemControlContainer}>
              <Pressable style={styles.saveButton} onPress={() => updateData(taskName, taskCompleted, taskGoal, setCompleted, props)}>
                <Text style={[styles.text]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={taskCompleted==taskGoal ? styles.containerComplete : styles.container}>
          <TouchableOpacity style={[styles.clickableContainer, {flexGrow: 1}]} onPress={() => incrementData(props, setCompleted)}>
              {taskCompleted==taskGoal ? 
                <Text style={[styles.text, {width: 75}]}><Icon name="check" size={40} /></Text> : 
                <Text style={[styles.text, {width: 75}]}>{props.nCompleted}/{props.nGoal}</Text>}
                <Text style={[styles.text, {flexGrow: 2, textAlign: "left"}]}>{props.taskName}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clickableContainer} onPress={() => editData(expanded, setExpanded)}>
              <Text style={[styles.text, {width: 75}]}>
                <Icon name="caretright" size={20} />
              </Text>
          </TouchableOpacity>
        </View>
      );
    }
};


function editData(expanded, setExpanded) {
    if (expanded) {
      setExpanded(false)
    }
    else {
      setExpanded(true)
    }
}

function updateData(name, completed, goal, setCompleted, props) {
  var tasks = [...props.tasks]

  for (var idx=0; idx<tasks.length; idx++) {
    if (tasks[idx].taskName === props.taskName) {
      tasks[idx].taskName = name
      tasks[idx].goal = goal
      if (completed <= goal) {
        tasks[idx].completed = completed
      } else {
        tasks[idx].completed = goal
        setCompleted(goal)
      }
    }
  }
  props.setTasks(tasks)
  Keyboard.dismiss()
}


function incrementData(props, setCompleted) {
    var tasks = [...props.tasks]

    for (var idx=0; idx<tasks.length; idx++) {
      if (tasks[idx].taskName === props.taskName) {
          if (tasks[idx].completed < tasks[idx].goal) {
            tasks[idx].completed++
            setCompleted(tasks[idx].completed)
          }
      }
    }
    props.setTasks(tasks)
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffeecc',
      justifyContent: 'start',
      alignItems: "center",
      width: Dimensions.get('window').width * 0.95,
      height: 75,
      marginVertical: 5,
      borderRadius: 20,
      flexDirection: "row",
    },
    containerComplete: {
      backgroundColor: '#00ffff',
      justifyContent: 'start',
      alignItems: "center",
      width: Dimensions.get('window').width * 0.95,
      height: 75,
      marginVertical: 5,
      borderRadius: 20,
      flexDirection: "row",
    },
    clickableContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        height: "100%",
    },
    text: {
      font: 'sans-serif',
      fontSize: 25,
      textAlign: "center",
    },
    labelText: {
      font: 'sans-serif',
      fontSize: 25,
      textAlign: "left",
      justifyContent: "flex-start",
      flexGrow: 1,
    },
    textBox: {
      width: 200,
      borderWidth: 0.5,
      borderRadius: 3,
      height: 50,
      fontSize: 30,
      fontWeight: "300",
      textAlign: "center",
    },
    itemControlContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      width: "90%",
      marginVertical: 5,
    },
    saveButton: {
      borderWidth: 0,
      borderRadius: 3,
      borderColor: "black",
      backgroundColor: "#80ff80",
      color: "white",
      flexGrow: 1,
      height: 50,
      justifyContent: "center"
    }
});