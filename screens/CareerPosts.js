import React from "react";
import { View,Text,StyleSheet } from 'react-native';
import { Post, PostForm } from "./Post";


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

