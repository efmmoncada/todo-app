import React from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import { AppSettings, backgroundStyle, colorStyle } from "../AppSettings";
import { useContext } from "react";


export default function DateDisplay() {
    const {darkMode} = useContext(AppSettings)

    var today = new Date();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    var day = days[today.getDay()]
    var month = months[today.getMonth()]
    var date = today.getDate()
    var year = today.getFullYear()
    var today  = month + " " + date + ", " + year

    return (
      <View style={[styles.container, backgroundStyle(darkMode)]}>
        <Text style={[styles.big_text, colorStyle(darkMode)]}>{day}</Text>
        <Text style={[styles.text, colorStyle(darkMode)]}>{today}</Text>
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'start',
      width: Dimensions.get('window').width,
      paddingTop: 15,
      paddingLeft: 10,
    },
    text: {
      font: 'sans-serif',
      fontSize: 20,
    },
    big_text: {
      fontSize: 45,
    },
});