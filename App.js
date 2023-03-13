import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './navigation/TabsNavigator';

function App() {
    // tasks will hold an array of objects, where each object will represent a task.
    // to add a task, a component should recive the setTasks function as a prop, and return a new array,
    // in which the previous state is spread, and the new task added to the front.
    const [tasks, setTasks] = useState([]);

    const STORAGE_KEY = "@tasks";

    /**
     * @param {string} key
     * @returns {Promise<object>}
     *
     * Reads and returns previously stored data from device storage.
     */
    const getDataFromStorage = async (key) => {
      try {
        const json = await AsyncStorage.getItem(key);
        if (!json) throw new Error("Could not read data from storage");
        const data = JSON.parse(json);

        return data;
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * @async
     * @param {string} key
     * @param {string|object} data
     *
     * Writes state date to device storage for later retrieval
     */
    const writeDataToStorage = async (key, data) => {
      try {
        const json = JSON.stringify(data);
        if (!json) return;
        await AsyncStorage.setItem(key, json);
      } catch (e) {
        console.log(e);
      }
    }

    function updateTasks(new_tasks) {
      setTasks(new_tasks)
      writeDataToStorage();
    }

    // loads previously saved task data from device storage and populates app state.
    useEffect(() => {
      getDataFromStorage(STORAGE_KEY)
        .then(data => setTasks(data))
        .catch(e => console.log(e));
    }, []);

    // updates device stored data whenever a change to state occurs.
    useEffect(() => {
      writeDataToStorage(STORAGE_KEY, tasks);
    }, [tasks])

    return (
        <NavigationContainer>
            <TabsNavigator tasks={tasks} setTasks={updateTasks} setTasksTemp={setTasks} />
        </NavigationContainer>
    );
}

export default App;
