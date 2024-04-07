import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Post } from './Post';

const posts = [
  { id: '1', fullName: 'John Doe', username: 'johndoe', profilePic: 'profile1.jpg', postText: 'We had a great time at the club meeting today!', postImage: 'onlystars.jpg', date: '2024-04-06' },
  { id: '2', fullName: 'Jane Smith', username: 'janesmith', profilePic: 'profile2.jpg', postText: 'Join us for our next event on Friday.', postImage: 'colors.jpg', date: '2024-04-05' },
  // Add more posts here as needed
];

const Home = () => {
  const [showUsername, setShowUsername] = useState(false);
  const toggleUsername = () => setShowUsername(!showUsername);

  return (
    <View style={styles.container}>
      {/* Sidebar icon to toggle username visibility */}
      <TouchableOpacity style={styles.sidebarIcon} onPress={toggleUsername}>
        <Text>{showUsername ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>

      {/* Username displayed at the upper right corner */}
      {showUsername && (
        <Text style={styles.username}>Username</Text>
      )}

      {/* FlatList of posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post
            fullName={item.fullName}
            username={item.username}
            profilePic={item.profilePic}
            postText={item.postText}
            postImage={item.postImage}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  sidebarIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'lightgrey',
    padding: 5,
    borderRadius: 5,
  },
  username: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export default Home;
