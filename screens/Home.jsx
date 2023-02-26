import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, } from "react-native";
import ItemDisplay from '../item/ItemDisplay';

export function Home({ tasks, setTasks }) {
  return (
    <View style={styles.container}>
      <ItemDisplay nCompleted="3" nGoal="5" taskName="Thingy" />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
