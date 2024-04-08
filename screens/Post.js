import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../UserContext'; // Adjust the import path as needed

const Post = ({ fullName, userName, profilePic, postText, postImage, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Image source={{ uri: profilePic || "../assets/colors.jpg" }} style={styles.profilePic} />
        <View>
          <Text>{fullName}</Text>
          <Text>{userName}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{postText}</Text>
      {postImage && <Image source={{ uri: postImage }} style={styles.postImage} resizeMode="contain" />}
    </View>
  );
};

const PostForm = () => {
  const { user: userInfo } = useUser();
  const [text, setText] = useState('');
  const [postImage, setPostImage] = useState('');
  const [category, setCategory] = useState('');

  // Effect hook to set initial state based on userInfo
  useEffect(() => {
    if (!postImage && userInfo?.profilePic) {
    setPostImage(userInfo.profilePic);
  }
  }, [userInfo, postImage]);

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.cancelled) {
      setPostImage(result.assets[0].uri);
    }
  };

  const savePost = async () => {
    const newPost = {
      id: '${userInfo,username}-${Date.now()}',
      userName: userInfo.userName, 
      fullName: userInfo.fullName, 
      profilePic: userInfo.profilePic || "../assets/colors.jpg", // This is fine for user info, not affecting the post image
      text, 
      postImage, // This is the image selected for the post
      category, 
      date: new Date().toISOString(),
      isLiked: false,
      likesCount:0,
      savedby:[],
    };
    try {
      const existingPosts = JSON.parse(await AsyncStorage.getItem('posts')) || [];
      const updatedPosts = [newPost, ...existingPosts]; // Prepend new post to keep the latest at the top
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
      setText(''); // Clear the text for a new post
      setPostImage(''); // Clear the postImage so the user can select a new one for the next post
      setCategory(''); // Reset category for a new post
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: userInfo.profilePic || "../assets/colors.jpg" }} style={styles.profilePic} />
        <Text>{userInfo.fullName}</Text>
        <Text>@{userInfo.userName}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
      />
      {postImage && <Image source={{ uri: postImage }} style={styles.imageView} resizeMode="contain" />}
      <Button title="Upload Image" onPress={handleUploadImage} />
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}>
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Career" value="career" />
        <Picker.Item label="Class" value="class" />
        <Picker.Item label="Major" value="major" />
      </Picker>
      <Button title="Post" onPress={savePost} />
    </View>
  );
};

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const savedPosts = JSON.parse(await AsyncStorage.getItem('posts')) || [];
      console.log('Fetched posts from AsyncStorage:', savedPosts);
      setPosts(savedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Post
          fullName={item.fullName}
          userName={item.userName}
          profilePic={item.profilePic || 'defaultURI'}
          postText={item.text}
          postImage={item.postImage}
          date={item.date}
        />
      )}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postText: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  imageView: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    resizeMode: 'contain'
  },
});

export { Post, PostForm, PostsFeed };
