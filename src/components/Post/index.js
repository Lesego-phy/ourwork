import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';

const days = 7;

const Post = (props) => {

  const post = props.post;

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('Post', {postId: post.id});
  }

  return (
    <Pressable onPress={goToPostPage} style={styles.container}>
      {/* Image  */}
      <Image
        style={styles.image}
        source={{uri: post.image}}
      />
      
      {/* Type & Description */}
      <Text style={styles.description} numberOfLines={2}>
        {post.type}. {post.title}
      </Text>

    </Pressable>
  );
};

export default Post;
