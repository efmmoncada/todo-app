import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './navigation/TabsNavigator';
import { AppSettingsProvider } from './AppSettings';
import { TaskTypes, StorageKeys } from './constants';

/**
   * @param {string} key
   * @returns {Promise<object>}
   *
   * Reads and returns previously stored data from device storage.
   */
const getDataFromStorage = async (key) => {
  try {
    const json = await AsyncStorage.getItem(key);
    if (!json) throw new Error(`Data parsed from storage at key "${key}" is null`);
    const data = JSON.parse(json);

    return data;
  } catch (e) {
    console.log(e);
  }
};

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
    console.error(e);
  }
};

function getWeek(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
}

const todaysDate = new Date();
function App() {
  // tasks will hold an array of objects, where each object will represent a task.
  // to add a task, a component should recive the setTasks function as a prop, and return a new array,
  // in which the previous state is spread, and the new task added to the front.
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [taskHistory, setTaskHistory] = useState({});


  useEffect(() => {
    // load previous task data
    getDataFromStorage(StorageKeys.TASK_HISTORY).then(data => {
      setTaskHistory(data);
    });
    // loads previously saved task data from device storage and populates app state.
    [StorageKeys.DAILY_TASKS, StorageKeys.WEEKLY_TASKS, StorageKeys.MONTHLY_TASKS].forEach((storageKey) => {
      getDataFromStorage(storageKey)
        .then((data) => {
          if (data) setTasks((existing) => [...existing, ...data]);
        })
        .catch((e) => console.error(e));
    });

    const currDate = new Date();
    // reset tasks at appropriate timeframe
    getDataFromStorage(StorageKeys.LAST_OPENED_DATE).then((date) => {
      const lastOpenedDate = new Date(date);

      setTaskHistory(prev => {
        const key = lastOpenedDate.toLocaleDateString('en-US');
        return {
          ...prev,
          [key]: tasks
        }
      });

      setTasks((existing) => {
        return existing.map((task) => {
          if (task.frequencyType === TaskTypes.Day && currDate.getDate() !== lastOpenedDate.getDate())
            return { ...task, completed: 0 };
          if (task.frequencyType === TaskTypes.Week && getWeek(currDate) !== getWeek(lastOpenedDate))
            return { ...task, completed: 0 };
          if (task.frequencyType === TaskTypes.Month && currDate.getMonth() !== lastOpenedDate.getMonth())
            return { ...task, completed: 0 };
          return task;
        });
      });
    });

    writeDataToStorage(StorageKeys.LAST_OPENED_DATE, currDate);
  }, []);

  // updates device stored data whenever a change to state occurs.
  useEffect(() => {
    const daily_tasks = tasks.filter((task) => task.frequencyType === TaskTypes.Day);
    const weekly_tasks = tasks.filter((task) => task.frequencyType === TaskTypes.Week);
    const monthly_tasks = tasks.filter((task) => task.frequencyType === TaskTypes.Month);

    writeDataToStorage(StorageKeys.DAILY_TASKS, daily_tasks);
    writeDataToStorage(StorageKeys.WEEKLY_TASKS, weekly_tasks);
    writeDataToStorage(StorageKeys.MONTHLY_TASKS, monthly_tasks);

    setTaskHistory(prev => {
      return {
        ...prev,
        [selectedDate.toLocaleDateString('en-US')]: tasks,
      };
    });
  }, [tasks]);

  useEffect(() => {
    console.log("called useeffect depending on taskHistory", taskHistory);
    writeDataToStorage(StorageKeys.TASK_HISTORY, taskHistory)
  }, [taskHistory]);

  useEffect(() => setTasks(taskHistory[selectedDate.toLocaleDateString('en-US')] || []), [selectedDate])

  return (
    <NavigationContainer>
      <AppSettingsProvider>
        <TabsNavigator tasks={tasks} setTasks={setTasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </AppSettingsProvider>
    </NavigationContainer>
  );
}

export default App;
