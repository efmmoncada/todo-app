import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";




const DaysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
const startNum = Math.floor(Math.random() * 23) + 1;
const dayNumbers = new Array(7).fill(0).map((_, i) => i + startNum);



export default function Calendar() {

    const [active, setActive] = useState(2)


    return (
        <View style={styles.container} >
            <Text style={styles.heading}>Calendar</Text>
            <View style={styles.inners}>
                {DaysOfWeek.map((day, i) => <Text key={i} style={styles.text}>{day}</Text>)}
            </View>
            <View style={styles.inners}>
                {dayNumbers.map((num, i) =>
                        <View key={i} style={i === active ? {...styles.active, ...styles.numberContainer} : styles.numberContainer}>
                            <Text style={styles.text}>{num}</Text>
                        </View>)}
            </View>


        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: '#DED4B9',
        width: "80%",
        height: "40%",
    },
    inners: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    text: {
        flex: 1,
        fontSize: 30,
        textAlign: "center",
        aspectRatio: 1 / 1
    },
    heading: {
        fontSize: 35,
        color: "#838383",
        marginLeft: 20,
    },
    active: {
        borderWidth: 5,
        borderColor: "#f00",
        borderRadius: "50%",
    },
    numberContainer: {
        height: 65,
    }
});