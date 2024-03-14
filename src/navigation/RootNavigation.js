//src//navigation//RootNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from './CustomDrawer';
import AppNavigation from './AppNavigation'; 

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={AppNavigation} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <CustomDrawer />
    </NavigationContainer>
  );
};

export default RootNavigation;
