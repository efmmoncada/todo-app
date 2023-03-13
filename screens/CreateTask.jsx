import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function CreateTask({ tasks, setTasks }) {
    const frequencyOptions = [
        { label: 'Monthly', value: 'Month' },
        { label: 'Weekly', value: 'Week' },
        { label: 'Daily', value: 'Day' },
    ];

    const [taskName, setTaskName] = useState('Title');
    const [goal, setGoal] = useState(0);
    const [frequency, setFrequency] = useState({ label: "Select Frequency", value: undefined});

    const handleSubmit = () => {
        const task = {
            taskName,
            goal,
            completed: 0,
            frequencyType: frequency.value,
        };

        setTasks((existingTasks) => [task, ...existingTasks]);

        setTaskName('');
        setGoal(0);
        setFrequency({});
        // TODO: navigate back to main page
    };

    return (
        <View>
            <View style={styles.lineItem}>
                <Text style={styles.label}>Task Name:</Text>
                <TextInput
                    style={styles.input}
                    editable
                    onChangeText={(val) => setTaskName(val)}
                    placeholder={taskName}
                />
            </View>

            <View style={styles.lineItem}>
                <TextInput
                    style={styles.input}
                    editable
                    onChangeText={(val) => setGoal(parseInt(val))}
                    placeholder={`${goal}`}
                />

                <Dropdown
                    data={frequencyOptions}
                    value={frequency}
                    placeholder="Select Frequency"
                    labelField="label"
                    valueField="value"
                    keyboardAvoiding
                    onChange={(selection) => setFrequency(selection)}
                    activeColor="lightblue"
                    style={{ flex: 1 }}
                    containerStyle={styles.dropdownContainer}
                />
            </View>

            <View style={styles.lineItem}>
                <Pressable style={styles.actionButton}>
                    <Text>Cancel</Text>
                </Pressable>

                <Pressable style={styles.actionButton} onPress={handleSubmit}>
                    <Text>Save</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    lineItem: {
        flexDirection: 'row',
        width: '100%',
    },
    label: {
        padding: 20,
    },
    input: {
        padding: 20,
    },
    dropdownContainer: {
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
    },
    actionButton: {
        padding: 5,
        margin: 20,
    },
});
