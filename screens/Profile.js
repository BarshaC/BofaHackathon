import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../UserContext';

const windowWidth = Dimensions.get('window').width; // Get the window width
const profileImageSize = windowWidth * 0.12; // Dynamically calculate the profile image size

const Profile = () => {
  const { user: userInfo } = useUser();
  const [profilePic, setProfilePic] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const loadProfilePicAndPosts = async () => {
      if (userInfo?.userName) {
        const uri = await AsyncStorage.getItem(`profilePic_${userInfo.userName}`);
        setProfilePic(uri || null);

        const postsJson = await AsyncStorage.getItem('posts');
        const posts = postsJson ? JSON.parse(postsJson) : [];
        const filteredPosts = posts.filter(post => post.userName === userInfo.userName);
        setUserPosts(filteredPosts);
      }
    };

    loadProfilePicAndPosts();
  }, [userInfo]);

  const handleUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const profileImageUri = result.assets[0].uri;
      setProfilePic(profileImageUri);
      await AsyncStorage.setItem(`profilePic_${userInfo.userName}`, profileImageUri);
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postText}>{item.text}</Text>
      {item.postImage && (
        <Image
          source={{ uri: item.postImage }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      {item.category && <Text style={styles.postCategory}>{item.category.toUpperCase()}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <View style={styles.userInfoSection}>
            <Image
              source={profilePic ? { uri: profilePic } : require("../assets/colors.jpg")}
              style={styles.photo}
            />
            <Text style={styles.name}>{userInfo.fullName}</Text>
            <Text style={styles.classYear}>Class Year: {userInfo.collegeYear}</Text>
            <Text style={styles.department}>Department: {userInfo.department}</Text>
            <Text style={styles.major}>Major: {userInfo.collegeMajor}</Text>
            <Text style={styles.interests}>Career Interests: {userInfo.careerInterests}</Text>
            <Button title="Upload Profile Picture" onPress={handleUploadImage} />
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => `post-${index}`}
            renderItem={renderPostItem}
            style={styles.postsList}
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
    paddingTop: 10,
  },
  userInfoSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  classYear: {
    fontSize: 16,
    marginBottom: 5,
  },
  department: {
    fontSize: 16,
    marginBottom: 5,
  },
  major: {
    fontSize: 16,
    marginBottom: 5,
  },
  interests: {
    fontSize: 16,
    marginBottom: 10,
  },
  photo: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize / 2,
    marginBottom: 10,
  },
  postItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  postText: {
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: windowWidth * 0.17, // Adjust based on your needs
    borderRadius: 8,
    marginBottom: 10,
  },
  postCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  postsList: {
    paddingHorizontal: 100,
  },
});

export default Profile;
