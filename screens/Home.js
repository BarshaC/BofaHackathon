import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const imageHeight = windowWidth * 0.35;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsJson = await AsyncStorage.getItem('posts');
        let postsData = postsJson ? JSON.parse(postsJson) : [];
        // Sort posts by date in descending order
        postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      if (selectedCategory === 'all') {
        setFilteredPosts(posts);
      } else {
        const filtered = posts.filter(post => post.category === selectedCategory);
        setFilteredPosts(filtered);
      }
    };
    filterPosts();
  }, [selectedCategory, posts]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Discover:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
          mode="dropdown" // Android only
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Career" value="career" />
          <Picker.Item label="Class" value="class" />
          <Picker.Item label="Major" value="major" />
        </Picker>
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: item.profilePic || 'defaultURI' }}
                style={styles.profilePic}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.fullName}>{item.fullName}</Text>
                <Text style={styles.username}>@{item.userName}</Text>
                {item.category && (
                  <Text style={styles.category}>{`Category: ${item.category}`}</Text>
                )}
              </View>
            </View>
            <Text style={styles.text}>{item.text}</Text>
            {item.postImage && (
              <Image
                source={{ uri: item.postImage }}
                style={styles.postImage}
                resizeMode="contain"
              />
            )}
          </View>
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffffff', // Consider using your app's theme color
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40, // Adjust as needed
  },
  postContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    padding: 10,
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
  fullName: {
    fontWeight: 'bold',
  },
  username: {
    color: 'grey',
  },
  category: {
    backgroundColor: '#E0E0E0',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  text: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: imageHeight,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Home;
