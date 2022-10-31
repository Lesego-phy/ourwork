import React from 'react';
import {View, Text, Image, ScrollView,} from 'react-native';
import styles from './styles.js';

const Post = (props) => {

  const post = props.post;

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Image  */}
        <Image
          style={styles.image}
          source={{uri: post.image}}
        />

        {/* Type & Description */}
        <Text style={styles.description} numberOfLines={2}>
          {post.type}. {post.title}
        </Text>


        <Text style={styles.longDescription}>
          {post.description}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Post;
