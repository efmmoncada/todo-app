import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './navigation/TabsNavigator';

function App() {
    // tasks will hold an array of objects, where each object will represent a task.
    // to add a task, a component should recive the setTasks function as a prop, and return a new array,
    // in which the previous state is spread, and the new task added to the front.
    const [tasks, setTasks] = useState([
      {
        taskName: "Walk",
        goal: 1,
        completed: 0,
        frequencyType: "Daily",
      },
      {
        taskName: "Read",
        goal: 30,
        completed: 10,
        frequencyType: "Daily",
      },
      {
        taskName: "Floss",
        goal: 1,
        completed: 0,
        frequencyType: "Daily",
      },
    ]);

    function updateTasks(new_tasks) {
      setTasks(new_tasks)
    }    

    return (
        <NavigationContainer>
            <TabsNavigator tasks={tasks} setTasks={updateTasks} />
        </NavigationContainer>
    );
}

export default App;
