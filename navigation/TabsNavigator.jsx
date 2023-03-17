import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import CreateTask from '../screens/CreateTask';

const Tabs = createBottomTabNavigator();

export function TabsNavigator({ tasks, setTasks }) {
    return (
        <Tabs.Navigator initialRouteName="Home">
            <Tabs.Screen name="Home" children={(props) => <Home tasks={tasks} setTasks={setTasks} {...props} />} />
            <Tabs.Screen
                name="Create"
                children={(props) => <CreateTask tasks={tasks} setTasks={setTasks} {...props} />}
            />
        </Tabs.Navigator>
    );
}
