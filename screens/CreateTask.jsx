import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function CreateTask({ tasks, setTasks }) {
    const [taskName, setTaskName] = useState('Title');
    const [frequency, setFrequency] = useState(0);
    const [frequencyType, setFrequencyType] = useState({});

    const frequencyOptions = [
        { label: 'Yearly', value: 'Year' },
        { label: 'Monthly', value: 'Month' },
        { label: 'Weekly', value: 'Week' },
        { label: 'Daily', value: 'Day' },
    ];

    const handleSubmit = () => {
        const task = {
            title: taskName,
            frequency,
            frequencyType: frequencyType.value,
        };

        console.log(task);

        setTasks((existingTasks) => [task, ...existingTasks]);
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
                    onChangeText={(val) => setFrequency(parseInt(val))}
                    placeholder={`${frequency}`}
                />

                <Dropdown
                    data={frequencyOptions}
                    value={frequencyType}
                    placeholder="Select Frequency"
                    labelField="label"
                    valueField="value"
                    keyboardAvoiding
                    onChange={(selection) => setFrequencyType(selection)}
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
