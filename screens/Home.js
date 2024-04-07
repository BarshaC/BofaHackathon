// HomeScreen.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Post from './Post';

const posts = [
  { id: '1', title: 'Club Activity 1', content: 'We had a great time at the club meeting today!' },
  { id: '2', title: 'Club Activity 2', content: 'Join us for our next event on Friday.' },
  // Add more posts here as needed
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post title={item.title} content={item.content} />
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
});

export default HomeScreen;
