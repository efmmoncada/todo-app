import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';


/**
 *
 * @param {Date} date
 * @returns {number[]}
 *
 * Returns the 7 date numbers of any any given week, starting at the closest past Monday of the supplied date.
 */
const getWeekDates = () => {
    const start = new Date();
    start.setDate(start.getDate() - 4);

    const end = new Date();
    end.setDate(end.getDate() + 3);

    let dayNumbers = [];
    for (const date = start; date < end; date.setDate(date.getDate() + 1) ) {
        dayNumbers.push(new Date(date.getTime()))
    }
    return dayNumbers;
};

const DayAbbrv = {
    0: "Su",
    1: "M",
    2: "T",
    3: "W",
    4: "Th",
    5: "F",
    6: "S",
};

const dayNumbers = getWeekDates();


export default function Calendar({ selectedDate, setSelectedDate }) {
    const [active, setActive] = useState(selectedDate);

    useEffect(() => setSelectedDate(active), [active]);


    return (
        <View style={styles.container}>
            <View style={styles.inners}>
                {dayNumbers.map((date) => (
                    <Text key={date.getDate()} style={[styles.text, { fontWeight: 'bold'}]}>
                        {DayAbbrv[date.getDay()]}
                    </Text>
                ))}
            </View>
            <View style={styles.inners}>
                {dayNumbers.map((date, i) => (
                    <Pressable key={i} onPress={() => setActive(date)}>
                        <View style={date.getDate() === active.getDate() ? styles.active : {}}>
                            <Text style={styles.text}>{date.getDate()}</Text>
                        </View>
                    </Pressable>
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
        backgroundColor: '#ffeecc',
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
