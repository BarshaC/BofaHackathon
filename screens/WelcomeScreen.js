import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function WelcomeScreen({navigation}){
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/colors.jpg")}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 400,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
