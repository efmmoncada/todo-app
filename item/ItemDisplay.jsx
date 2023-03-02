import React from "react";
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'


export default function ItemDisplay(props) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.clickableContainer, {flexGrow: 1}]} onPress={incrementData}>
            <Text style={[styles.text, {width: 75}]}>{props.nCompleted}/{props.nGoal}</Text>
            <Text style={[styles.text, {flexGrow: 2, textAlign: "left"}]}>{props.taskName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clickableContainer} onPress={editData}>
            <Text style={[styles.text, {width: 75}]}>
              <Icon name="caretright" size={20} />
            </Text>
        </TouchableOpacity>
      </View>
    );
};


function editData() {
    alert("Editing data")
}


function incrementData() {
    alert("Incrementing Data")
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