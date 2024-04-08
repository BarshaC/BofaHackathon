import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageHeightPercentage = 0.5;
const imageHeight = windowHeight * imageHeightPercentage;
const imageWidth = windowWidth - 10;

function timeAgo(date) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  const elapsedTime = (new Date() - new Date(date)) / 1000; // convert to seconds

  if (elapsedTime < minute) return 'Just now';
  if (elapsedTime < hour) return Math.round(elapsedTime / minute) + ' minutes ago';
  if (elapsedTime < day) return Math.round(elapsedTime / hour) + ' hours ago';
  if (elapsedTime < week) return Math.round(elapsedTime / day) + ' days ago';

  return new Date(date).toLocaleDateString();
}

const clearOldPosts = async () => {
  try {
    const postsJson = await AsyncStorage.getItem('posts');
    let posts = postsJson ? JSON.parse(postsJson) : [];

    // Calculate the cutoff time: current time - 5 hours
    const fiveHoursAgo = new Date(new Date().getTime() - (5 * 60 * 60 * 1000));

    // Filter out posts older than 5 hours
    posts = posts.filter(post => new Date(post.date) > fiveHoursAgo);

    // Save the filtered posts back to AsyncStorage
    await AsyncStorage.setItem('posts', JSON.stringify(posts));
    console.log('Posts older than 5 hours removed successfully.');
  } catch (error) {
    console.error('Error clearing old posts:', error);
  }
};


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    clearOldPosts();
    const fetchPosts = async () => {
      try {
        const postsJson = await AsyncStorage.getItem('posts');
        let postsData = postsJson ? JSON.parse(postsJson) : [];

        // Simulate fetching the latest profile picture for each post
        const postsDataWithUpdatedPics = await Promise.all(postsData.map(async (post) => {
          const profilePicUri = await AsyncStorage.getItem(`profilePic_${post.userName}`);
          return { ...post, profilePic: profilePicUri || 'defaultURI' };
        }));

        postsDataWithUpdatedPics.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(postsDataWithUpdatedPics);
        setFilteredPosts(postsDataWithUpdatedPics);
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


  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: item.profilePic }}
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
      <Text style={styles.date}>{timeAgo(item.date)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Discover:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
          mode="dropdown"
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
        renderItem={renderItem}
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
    backgroundColor: '#ffffff', 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  actionText: {
    color: '#007bff',
    fontSize: 16,
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
    width: imageWidth,
    height: imageHeight,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Home;
