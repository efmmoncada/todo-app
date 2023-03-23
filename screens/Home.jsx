import { StatusBar } from 'expo-status-bar';
import DateDisplay from '../date/DateDisplay';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ItemDisplay from '../item/ItemDisplay';
import Calendar from '../src/components/Calendar';
import { AppSettings, backgroundStyle } from '../AppSettings';
import { useContext } from 'react';
import TaskSection from '../src/components/TaskSection';

export function Home({ tasks, setTasks, selectedDate, setSelectedDate }) {
    const {darkMode} = useContext(AppSettings)

    return (
        <View style={[styles.container, backgroundStyle(darkMode)]}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
                automaticallyAdjustKeyboardInsets={true}
            >
                <DateDisplay selectedDate={selectedDate} />
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                {tasks.length ? (
                    <ScrollView>
                        <TaskSection title='Daily' tasks={tasks.filter(task => task.frequencyType === 'Day')} setTasks={setTasks} />
                        <TaskSection title='Weekly' tasks={tasks.filter(task => task.frequencyType === 'Week')} setTasks={setTasks} />
                        <TaskSection title='Monthly' tasks={tasks.filter(task => task.frequencyType === 'Month')} setTasks={setTasks} />
                    </ScrollView>
                ) : (
                    <Text>No Tasks Available</Text>
                )}
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'start',
    },
});
