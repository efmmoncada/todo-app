import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ItemDisplay from '../../item/ItemDisplay';

/**
 *
 * @param {object} props
 * @param {object[]} props.tasks
 * @param {string} props.title
 */
export default function TaskSection({ tasks, title, setTasks }) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>

            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <ItemDisplay
                        key={task.taskName}
                        nCompleted={task.completed}
                        nGoal={task.goal}
                        taskName={task.taskName}
                        setTasks={setTasks}
                    />
                ))
            ) : (
                <Text>No Tasks to Display</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 22,
    },
});
