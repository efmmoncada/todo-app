import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator }  from './navigation/TabsNavigator';

function App() {
  return (
    <NavigationContainer>
        <TabsNavigator />
    </NavigationContainer>
  );
}

export default App;
