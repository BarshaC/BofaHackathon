import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [collegeYear, setCollegeYear] = useState('Freshman');
  const [department, setDepartment] = useState('');
  const [collegeMajor, setCollegeMajor] = useState('');
  const [careerInterests, setCareerInterests] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState(null);

  const handleSubmit = async() => {
    console.log('Registration data:', { fullName, userName, password, collegeYear, department, collegeMajor, careerInterests });
    try {
      await AsyncStorage.setItem(userName, JSON.stringify({fullName, collegeYear,department, collegeYear, department, collegeMajor, careerInterests}));
    } catch (error) {
      console.error('Errror saving user information: ', error);
    }
    navigation.navigate('Home');
  };

  const togglePickerVisibility = (type) => {
    setShowPicker(!showPicker);
    setPickerType(type);
  };

  const selectOption = (option) => {
    if (pickerType === 'collegeYear') {
      setCollegeYear(option);
    } else if (pickerType === 'department') {
      setDepartment(option);
    }
    setShowPicker(false);
  };

  const collegeYearOptions = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD'];

  const departmentOptions = [
    "College of Arts & Sciences",
    "College of Dentistry",
    "College of Engineering & Architecture",
    "College of Fine Arts",
    "College of Medicine",
    "College of Nursing & Allied Health Sciences",
    "College of Pharmacy",
    "College of Business",
    "College of Communications",
    "School of Divinity",
    "School of Education",
    "School of Law",
    "School of Social Work",
  ];

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
          onChangeText={setFullName}
          value={fullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUserName}
          value={userName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.pickerContainer} onPress={() => togglePickerVisibility('collegeYear')}>
          <Text style={styles.pickerText}>{collegeYear}</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker && pickerType === 'collegeYear'}
            onRequestClose={() => setShowPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerModal}>
                {collegeYearOptions.map((option, index) => (
                  <Pressable key={index} onPress={() => selectOption(option)}>
                    <Text style={styles.modalItem}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerContainer} onPress={() => togglePickerVisibility('department')}>
          <Text style={styles.pickerText}>{department || 'Department'}</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker && pickerType === 'department'}
            onRequestClose={() => setShowPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerModal}>
                {departmentOptions.map((option, index) => (
                  <Pressable key={index} onPress={() => selectOption(option)}>
                    <Text style={styles.modalItem}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Major"
          onChangeText={setCollegeMajor}
          value={collegeMajor}
        />
        <TextInput
          style={styles.input}
          placeholder="Career Interests"
          onChangeText={setCareerInterests}
          value={careerInterests}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
