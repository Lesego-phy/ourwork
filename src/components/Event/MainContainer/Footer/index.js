import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { EventType } from "../../../../types";
import styles from './styles';
import { createLike, deleteLike } from '../../../../src/graphql/mutations';

// export type FooterContainerProps = {
//   event: EventType
// }

//const Footer = ({ event }: FooterContainerProps) =>

const Footer = ({ event }) => {

  console.log(event);

  const [user, setUser] = useState(null);
  const [myLike, setMyLike] = useState(null);
  const [likesCount, setLikesCount] = useState(event.likes.items.length);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);

      const searchedLike = event.likes.items.find(
        (like) => like.userID === currentUser.attributes.sub
      );
      setMyLike(searchedLike);
    }
    fetchUser();
  }, [])

  const submitLike = async () => {
    const like = {
      userID: user.attributes.sub,
      eventID: event.id,
    }

    try {
      const res = await API.graphql(graphqlOperation(createLike, { input: like }))
      setMyLike(res.data.createLike);
      setLikesCount(likesCount + 1);
    } catch (e) {
      console.log(e);
    }
  }

  const removeLike = async () => {
    try {
      await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike.id } }))
      setLikesCount(likesCount - 1);
      setMyLike(null);
    } catch (e) {
      console.log(e);
    }
  }

  const onLike = async () => {
    if (!user) {
      return;
    }

    if (!myLike) {
      await submitLike()
    } else {
      await removeLike();
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={"message-square"} size={20} color={'grey'}/>
        <Text style={styles.number}>{event.numberOfComments}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name={"external-link"} size={28} color={'grey'}/>
        <Text style={styles.number}>{event.numberOfRehosts}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onLike}>
          <AntDesign name={!myLike ? "hearto" : "heart"} size={20} color={!myLike ? 'grey' : 'red'}/>
        </TouchableOpacity>
        <Text style={styles.number}>{likesCount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome name="download" size={28} color={'grey'} />
      </View>
    </View>
  )
}

export default Footer;