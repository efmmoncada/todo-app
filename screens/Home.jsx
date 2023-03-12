import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, } from "react-native";
import ItemDisplay from '../item/ItemDisplay';

export function Home({ tasks, setTasks }) {
    return (
        <View style={styles.container}>
            <DateDisplay />
            {tasks.length ?
                tasks.map((task) => (
                    <ItemDisplay nCompleted={task.completed} nGoal={task.goal} taskName={task.taskName} setTasks={setTasks} />
                )) : <Text>No Tasks Available</Text>}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
