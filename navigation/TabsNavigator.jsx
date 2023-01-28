import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";

const Tabs = createBottomTabNavigator();

export function TabsNavigator() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Test" component={Home} />
        </Tabs.Navigator>
    )
}
