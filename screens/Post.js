import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../UserContext';
import { Picker } from '@react-native-picker/picker';

const Post = ({ fullName, userName, profilePic, postText, postImage, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Image source={{ uri: profilePic || "../assets/colors.jpg" }} style={styles.profilePic} />
        <View>
          <Text>{fullName}</Text>
          <Text>@{userName}</Text>
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
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      const uri = await AsyncStorage.getItem(`profilePic_${userInfo.userName}`);
      setProfilePic(uri);
    };

    if (userInfo?.userName) {
      fetchProfilePic();
    }
  }, [userInfo]);

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
      id: `${userInfo.userName}-${Date.now()}`,
      userName: userInfo.userName,
      fullName: userInfo.fullName,
      profilePic: profilePic || "../assets/colors.jpg",
      text,
      postImage,
      category,
      date: new Date().toISOString(),
      isLiked: false,
      likesCount: 0,
      savedBy: [],
    };

    try {
      const existingPosts = JSON.parse(await AsyncStorage.getItem('posts')) || [];
      const updatedPosts = [newPost, ...existingPosts];
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
      setText('');
      setPostImage('');
      setCategory('');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: profilePic || "../assets/colors.jpg" }} style={styles.profilePic} />
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
      setPosts(savedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <Post
          fullName={item.fullName}
          userName={item.userName}
          profilePic={item.profilePic || "../assets/colors.jpg"}
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
    resizeMode: 'contain',
  },
});

export { Post, PostForm, PostsFeed };
