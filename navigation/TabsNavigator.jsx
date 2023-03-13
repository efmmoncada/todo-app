import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import CreateTask from '../screens/CreateTask';

const Tabs = createBottomTabNavigator();

export function TabsNavigator({ tasks, setTasks, setTasksTemp }) {
    return (
        <Tabs.Navigator initialRouteName="Create">
            <Tabs.Screen name="Home" children={(props) => <Home tasks={tasks} setTasks={setTasks} {...props} />} />
            <Tabs.Screen
                name="Create"
                children={(props) => <CreateTask tasks={tasks} setTasks={setTasksTemp} {...props} />}
            />
        </Tabs.Navigator>
    );
}
