import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import BottomTabNavigator from './BottomTabNavigator';
import LoginForm from '../screens/Login';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
      <Stack.Navigator screenOptions={{}} initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
  );
}
