import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import BottomTabNavigator from './BottomTabNavigator';
import LoginForm from '../screens/Login';
import { Image, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const CustomHeader = () => (
  <Image
    source={require('../assets/login_top.png')}
    style={{ width: '100%', height: '80%' }}
  />
);

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '10%',
    resizeMode: 'stretch', // Adjust the resizeMode to 'contain'
  },
});

export default function AuthNavigator() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{headerStyle: { height: 80 }, headerBackground: () => <CustomHeader />, headerBackTitleVisible: false}} initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </>
  );
}

// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Register from '../screens/Register';
// import ForgotPassword from '../screens/ForgotPassword';
// import BottomTabNavigator from './BottomTabNavigator';
// import LoginForm from '../screens/Login';

// const Stack = createNativeStackNavigator();

// export default function AuthNavigator() {
//   return (
//       <Stack.Navigator screenOptions={{}} initialRouteName='Login'>
//         <Stack.Screen name="Login" component={LoginForm} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//         <Stack.Screen name="Home" component={BottomTabNavigator} />
//       </Stack.Navigator>
//   );
// }
