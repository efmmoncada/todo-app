import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './navigation/TabsNavigator';

function App() {
    // tasks will hold an array of objects, where each object will represent a task.
    // to add a task, a component should recive the setTasks function as a prop, and return a new array,
    // in which the previous state is spread, and the new task added to the front.
    const [tasks, setTasks] = useState([]);

    return (
        <NavigationContainer>
            <TabsNavigator tasks={tasks} setTasks={setTasks} />
        </NavigationContainer>
    );
}

export default App;
