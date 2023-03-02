import { StatusBar } from 'expo-status-bar';
import DateDisplay from '../date/DateDisplay';
import { View, StyleSheet, Text } from "react-native";
import ItemDisplay from '../item/ItemDisplay';


export function Home() {
  return (
    <View style={styles.container}>
      <DateDisplay />
      <ItemDisplay nCompleted="15" nGoal="50" taskName="Pushups" />
      <ItemDisplay nCompleted="1" nGoal="2" taskName="Brush Teeth" />
      <ItemDisplay nCompleted="0" nGoal="30" taskName="Read" />
      <ItemDisplay nCompleted="1" nGoal="1" taskName="Walk" />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'start',
    },
  });
