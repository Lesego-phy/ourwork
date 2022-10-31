import React from 'react';
import { View } from 'react-native';
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";

import { EventType } from '../../types';

import styles from './styles';

// export type EventProps = {
//   event: EventType,
// }

//const Event = ({ event }: EventProps) =>

const Event = ({ event }) => (
  <View style={styles.container}>
     <LeftContainer user={event.user} />
     <MainContainer event={event} />
  </View>
)

export default Event;