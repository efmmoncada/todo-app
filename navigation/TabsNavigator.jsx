import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import CreateTask from '../screens/CreateTask';
import Settings from '../screens/Settings';
import { AppSettings, backgroundStyle, colorStyle } from '../AppSettings';
import { useContext } from 'react';

const Tabs = createBottomTabNavigator();

export function TabsNavigator({ tasks, setTasks }) {
    const {darkMode} = useContext(AppSettings)
    const screenOptions = {
        tabBarStyle:{
          backgroundColor: darkMode ? "#b3b3b3" : "white",
        },
        tabBarInactiveTintColor: darkMode ? "#4d4d4d" : "#8e8e8e",
        headerShown: true,
        headerStyle: {
            backgroundColor: darkMode ? "#b3b3b3" : "white",
        }
    };

    return (
        <Tabs.Navigator initialRouteName="Home" {...{screenOptions}}>
            <Tabs.Screen name="Home" children={(props) => <Home tasks={tasks} setTasks={setTasks} {...props} />} />
            <Tabs.Screen
                name="Create"
                children={(props) => <CreateTask tasks={tasks} setTasks={setTasks} {...props} />}
            />
             <Tabs.Screen
                name="Settings"
                children={(props) => <Settings tasks={tasks} setTasks={setTasks} {...props} />}
            />
        </Tabs.Navigator>
    );
}
