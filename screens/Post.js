// Post.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';

//for viewing posts
const Post = ({ fullName, username, profilePic, postText, postImage, date }) => {
  return (
    <div className='post'>
      <div className='postHeader'>
        <img src={profilePic}/>
        <div>
          <span>{fullName}</span>
          <span>{username}</span>
        </div>
      </div>
      <p>{postText}</p>
      {image && <img src={postImage} />} 
    </div>
  );
};
//For creating a post
const PostForm = ({ username, fullName, profilePic }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{fullName} </Text>
        <Text>{username} </Text>
      </View>
      <TextInput
        style = {styles.input}
        placeholder= "What's on your mind?"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};
// const styles
/*const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});*/

export {Post, PostForm};
