import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import { PostForm } from '../screens/Post';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing MaterialCommunityIcons

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        style: { 
          backgroundColor: '#74BD96', // Adjusted to match the provided color
          borderTopWidth: 5,
          borderTopColor: '#BFD7B5'
        },
        activeTintColor: "blue",
        inactiveTintColor: "#BFD7B5",
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Post" 
        component={PostForm}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
