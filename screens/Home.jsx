import { StatusBar } from 'expo-status-bar';
import DateDisplay from '../date/DateDisplay';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ItemDisplay from '../item/ItemDisplay';
import Calendar from '../src/components/Calendar';

export function Home({ tasks, setTasks }) {
    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
                automaticallyAdjustKeyboardInsets={true}
            >
                <DateDisplay />
                <Calendar />
                {tasks.length ? (
                    tasks.map((task) => (
                        <ItemDisplay
                            key={task.taskName}
                            nCompleted={task.completed}
                            nGoal={task.goal}
                            taskName={task.taskName}
                            setTasks={setTasks}
                            tasks={tasks}
                        />
                    ))
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'start',
    },
});
