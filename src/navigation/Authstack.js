// @ts-nocheck
/* eslint-disable */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register';
import LogIn from './../screens/Login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LogIn}
        options={{ header: () => null }}
      />
      <Stack.Screen name='Signup' component={Register} />
    </Stack.Navigator>
  );
}