import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';

function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [collegeYear, setCollegeYear] = useState('Freshman');
  const [department, setDepartment] = useState('');
  const [careerInterests, setCareerInterests] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleRegister = () => {
    console.log('Registration data:', { fullName, collegeYear, department, careerInterests });
    navigation.navigate('Login');
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const selectCollegeYear = (year) => {
    setCollegeYear(year);
    setShowPicker(false);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/colors.jpg')}
      blur={10}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={text => setFullName(text)}
          value={fullName}
        />
        <TouchableOpacity style={styles.pickerContainer} onPress={togglePicker}>
          <Text style={styles.pickerText}>{collegeYear}</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker}
            onRequestClose={() => setShowPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerModal}>
                <Pressable onPress={() => selectCollegeYear('Freshman')}>
                  <Text style={styles.modalItem}>Freshman</Text>
                </Pressable>
                <Pressable onPress={() => selectCollegeYear('Sophomore')}>
                  <Text style={styles.modalItem}>Sophomore</Text>
                </Pressable>
                <Pressable onPress={() => selectCollegeYear('Junior')}>
                  <Text style={styles.modalItem}>Junior</Text>
                </Pressable>
                <Pressable onPress={() => selectCollegeYear('Senior')}>
                  <Text style={styles.modalItem}>Senior</Text>
                </Pressable>
                <Pressable onPress={() => selectCollegeYear('Masters')}>
                  <Text style={styles.modalItem}>Masters</Text>
                </Pressable>
                <Pressable onPress={() => selectCollegeYear('PhD')}>
                  <Text style={styles.modalItem}>PhD</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Department"
          onChangeText={text => setDepartment(text)}
          value={department}
        />
        <TextInput
          style={styles.input}
          placeholder="Career Interests"
          onChangeText={text => setCareerInterests(text)}
          value={careerInterests}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
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
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerText: {
    height: 40,
    lineHeight: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;
