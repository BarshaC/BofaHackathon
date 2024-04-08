import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageHeightPercentage = 0.5; // Adjusted from 40% to 50%
const imageHeight = windowHeight * imageHeightPercentage;
const imageWidth = windowWidth - 10;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsJson = await AsyncStorage.getItem('posts');
        let postsData = postsJson ? JSON.parse(postsJson) : [];
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

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedPost = {
          ...post,
          isLiked: !post.isLiked,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1
        };
        return updatedPost;
      }
      return post;
    });

    setPosts(updatedPosts);
    // Persist the changes in AsyncStorage
    AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // Handle Comment
  const handleComment = (postId) => {
    // Implement comment functionality here
    console.log("Comment on Post:", postId);
  };

  // Handle Save
  const handleSave = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        // Check if the current user has already saved the post
        const hasSaved = post.savedBy.includes(userInfo.userName);
        const newSavedBy = hasSaved 
          ? post.savedBy.filter(username => username !== userInfo.userName) // Unsave if already saved
          : [...post.savedBy, userInfo.userName]; // Save otherwise
  
        return { ...post, savedBy: newSavedBy };
      }
      return post;
    });
  
    setPosts(updatedPosts);
    // Persist the changes in AsyncStorage
    AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

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
        renderItem={({ item, index }) => (
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
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => handleLike(index)}>
              <Icon name="thumbs-up" size={24} color={item.isLiked ? "#74BD96" : "#ccc"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(index)}>
                <Icon name="comment" size={24} color="#74BD96" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSave(index)}>
                <Icon name="bookmark" size={24} color="#74BD96" />
              </TouchableOpacity>
            </View>
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
    // flex: 1,
    // height: 60, 
    // background: 'white',
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
