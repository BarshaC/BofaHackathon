import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Retrieve user information when component mounts
    const fetchUserInfo = async () => {
      // Check if route params and username exist before accessing them
      if (route.params && route.params.username) {
        const loggedInUsername = route.params.username; 
        try {
          const userData = await AsyncStorage.getItem(loggedInUsername);
          if (userData) {
            setUserInfo(JSON.parse(userData));
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
    };

    fetchUserInfo();
  }, [route.params]);

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.name}>{userInfo.fullName}</Text>
          <Text style={styles.classYear}>Class Year: {userInfo.collegeYear}</Text>
          <Text style={styles.department}>Department: {userInfo.department}</Text>
          <Text style={styles.major}>Major: {userInfo.collegeMajor}</Text>
          <Text style={styles.interests}>Career Interests: {userInfo.careerInterests}</Text>
          {/* Assuming you have a placeholder image */}
          <Image
            source={require("../assets/colors.jpg")} 
            style={styles.photo}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classYear: {
    fontSize: 18,
    marginBottom: 10,
  },
  department: {
    fontSize: 18,
    marginBottom: 10,
  },
  major: {
    fontSize: 18,
    marginBottom: 10,
  },
  interests: {
    fontSize: 18,
    marginBottom: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default Profile;
