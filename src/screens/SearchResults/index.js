import React from "react";
import { View, FlatList } from "react-native";
import Post from '../../components/Post';
import Feed from '../../components/Feed'

const SearchResultsScreen = (props) => {

  const { posts } = props;

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Feed post={item} />}
      />
    </View>
  );
};

export default SearchResultsScreen;
