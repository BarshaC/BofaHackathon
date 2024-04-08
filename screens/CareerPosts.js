import React from "react";
import { View,Text,StyleSheet, FlatList} from 'react-native';
import { Post} from "./Post";


const CareerPosts = () =>{
    const [posts, setPosts] =useState();

    fetchCareerPost();

    return(
        <View>
           <Post {...postProps} />
           <PostForm {...formProps}/>
        </View>
    );
};

const fetchCareerPost = async () =>{
    try{
        const response = await fetch('');
        const postData = await response.json();

        setPosts(postData);
    }
    
    catch(error){
        console.error('Error loading post', error)
    }
};


const renderPostItem = ({ item }) => <Post {...item} />;

return (
  <View style={styles.container}>
    <FlatList
      data={posts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);


const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 10,
},
});

export default CareerPosts;