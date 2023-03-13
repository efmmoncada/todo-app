import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 *
 * @param {Date} date
 * @returns {number[]}
 *
 * Returns the 7 date numbers of any any given week, starting at the closest past Monday of the supplied date.
 */
const getWeekDateNumbers = (date) => {
    while (date.getDay() !== 1) date.setDate(date.getDate() - 1);

    const dayNumbers = [];

    for (let i = 0; i < 7; i++) {
        dayNumbers.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }

    return dayNumbers;
};

export default function Calendar() {

    const DaysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
    const date = new Date();
    const dayNumbers = getWeekDateNumbers(date);



    const [active, setActive] = useState(date.getDay() - 1);


    return (
        <View style={styles.container}>
            <View style={styles.inners}>
                {DaysOfWeek.map((day, i) => (
                    <Text key={i} style={[styles.text, { fontWeight: 'bold'}]}>
                        {day}
                    </Text>
                ))}
            </View>
            <View style={styles.inners}>
                {dayNumbers.map((num, i) => (
                    <View
                        key={i}
                        style={i === active ? styles.active : {}}
                    >
                        <Text style={styles.text}>{num}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '95%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#DED4B9',
    },
    inners: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8,
    },
    text: {
        fontSize: 20,
    },
    active: {
        borderBottomWidth: 4,
        borderColor: '#f00',
    },
});
