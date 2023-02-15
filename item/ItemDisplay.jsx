import React from "react";
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native";


export default function ItemDisplay(props) {
    var data = {nCompleted: props.nCompleted,}

    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.clickableContainer, {flexGrow: 1}]} onPress={() => incrementData(data)}>
            <Text style={[styles.text, {width: 75}]}>{data.nCompleted}/{props.nGoal}</Text>
            <Text style={[styles.text, {flexGrow: 2, textAlign: "left"}]}>{props.taskName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clickableContainer} onPress={editData}>
            <Text style={[styles.text, {width: 75}]}>></Text>
        </TouchableOpacity>
      </View>
    );
};


function editData() {
    alert("Editing data")
}


function incrementData(data) {
    data.nCompleted++
    console.log(data.nCompleted)
    alert("Incrementing data")
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
});