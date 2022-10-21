import React from 'react';
import { View, Text, Image } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import { EventType } from "../../../types";
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import Footer from './Footer';

// export type MainContainerProps = {
//  event: EventType
// }

//const MainContainer = ({event }: MainContainerProps) =>

const MainContainer = ({event }) => (
  <View style={styles.container}>
    <View style={styles.eventHeaderContainer}>
      <View style={styles.eventHeaderNames}>
        <Text style={styles.name}>{event.user.name}</Text>
        <Text style={styles.username}>@{event.user.username}</Text>
        <Text style={styles.createdAt}>{moment(event.createdAt).fromNow()}</Text>
      </View>
      <Entypo name={"chevron-down"} size={16} color={'grey'}/>
    </View>
    <View>
      <Text style={styles.content}>{event.content}</Text>
      {!!event.image && <S3Image style={styles.image} imgKey={event.image} />}
    </View>
    <Footer event={event} />
  </View>
)

export default MainContainer;