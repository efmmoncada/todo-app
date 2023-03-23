import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import CreateTask from '../screens/CreateTask';
import Settings from '../screens/Settings';
import { AppSettings, backgroundStyle, colorStyle } from '../AppSettings';
import { useContext } from 'react';
import Screens from '../screens/ScreenNames';

const Tabs = createBottomTabNavigator();

export function TabsNavigator({ tasks, setTasks, selectedDate, setSelectedDate }) {
  const { darkMode } = useContext(AppSettings);
  const screenOptions = {
    tabBarStyle: {
      backgroundColor: darkMode ? '#b3b3b3' : 'white',
    },
    tabBarInactiveTintColor: darkMode ? '#4d4d4d' : '#8e8e8e',
    headerShown: true,
    sceneContainerStyle: {
      color: 'red',
    },
    headerStyle: {
      backgroundColor: darkMode ? '#b3b3b3' : 'white',
    },
  };

  return (
    <Tabs.Navigator initialRouteName={Screens.Home} {...{ screenOptions }}>
      <Tabs.Screen
        name={Screens.Home}
        children={(props) => (
          <Home
            tasks={tasks}
            setTasks={setTasks}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            {...props}
          />
        )}
      />
      <Tabs.Screen
        name={Screens.CreateTasks}
        children={(props) => <CreateTask tasks={tasks} setTasks={setTasks} {...props} />}
      />
      <Tabs.Screen
        name={Screens.Settings}
        children={(props) => <Settings tasks={tasks} setTasks={setTasks} {...props} />}
      />
    </Tabs.Navigator>
  );
}
