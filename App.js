import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from './components/MapScreen'
import MarkerScreen from './components/MarkerScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={MapScreen} />
        <Stack.Screen name="Marker" component={MarkerScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
};
