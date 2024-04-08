import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UserContext'
const logo = require("../assets/logo.png");
const facebook = require("../assets/facebook.png");
const linkedin = require("../assets/linkedIn.png");
const instagram = require("../assets/instagram.png");
const login_bottom = require("../assets/login_bottom.png")

export default function LoginForm() {
    const navigation = useNavigation();
    const { setUser } = useUser();
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
      try {
          console.log(`Attempting login with username: ${username}`);
          const userDataString = await AsyncStorage.getItem(username);
          const userData = JSON.parse(userDataString);
          console.log(`Fetched user data for ${username}:`, userData);

          if (!userData) {
            console.log('No user data found for this username.'); // Log if no data found
            Alert.alert("Invalid credentials!");
            return;
        }
  
        if (userData.password === password) {
            setUser(userData);
            console.log('Login successful.'); // Log success
            navigation.navigate('Home', { userData });
        } else {
            console.log('Password does not match.'); // Log password mismatch
            console.log('Actual password', userData.password)
            console.log('Entered Password',password)
            Alert.alert("Invalid credentials!");
        }
      } catch (error) {
          console.log('Login error:', error);
          Alert.alert("Login failed", "Please try again later.");
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={username} onChangeText={setUsername} autoCorrect={false} autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false} autoCapitalize='none'/>
            </View>
            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Text style={styles.optionsText}>OR LOGIN WITH</Text>
            </View>
            
            <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons}   />
                <Image source={instagram} style={styles.icons}  />
                <Image source={linkedin} style={styles.icons}  />
            </View>

            <Text style={styles.footerText}> Don't Have Account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signup}>  Sign Up</Text>
            </Pressable>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <Image source={login_bottom} style={styles.image2} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems : "center",
    backgroundColor: "white",
    paddingTop: 100,
  },
  image : {
    height : 160,
    width : 170
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "#BFD7B5"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    backgroundColor: '#74BD96',
    borderColor : "#BFD7B5",
    borderWidth : 4,
    borderRadius: 20
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "#BFD7B5"
  },
  button : {
    backgroundColor : "#74BD96",
    height : 45,
    borderColor : "#BFD7B5",
    borderWidth  : 4,
    borderRadius : 20,
    alignItems : "center",
    justifyContent : "center"
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
  },
  signup : {
    color : "red",
    fontSize : 13
  },
  image2 : {
    width : '100%',
    height : 'auto',
    resizeMode: 'cover'
  }
});
