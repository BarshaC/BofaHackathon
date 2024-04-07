//Post.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Post = ({ fullName, username, profilePic, postText, postImage, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <View>
          <Text>{fullName}</Text>
          <Text>{username}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{postText}</Text>
      {postImage && <Image source={{ uri: postImage }} style={styles.postImage} />}
    </View>
  );
};

const PostForm = ({ username, fullName, profilePic }) => {
  const [text, setText] = useState('');
  const [postImage, setpostImage] = useState('');

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    }); 
    if (!result.cancelled) {
      setpostImage(result.uri); 
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text>{fullName}</Text>
        <Text>{username}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      {postImage && <Image source={{ uri: postImage }} style={styles.imageView} />}
      <Button title ="Upload Image" onPress={handleUploadImage}/>
      <Button title ="Post" onPress={()=>console.log({text, postImage})}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export { Post, PostForm };
