import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import Profile from './screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import AuthNavigator from './navigations/AuthNavigator'
import { UserProvider } from './UserContext';

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <AuthNavigator></AuthNavigator>
    </NavigationContainer>
    </UserProvider>
  );
}
