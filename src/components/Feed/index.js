import React, {useEffect, useState} from 'react';
import { View, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

import { listEvents } from '../../src/graphql/queries';
import Event from '../Event'
//import UserFleetsList from "../UserFleetsList";

const Feed = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await API.graphql(graphqlOperation(listEvents));
      setEvents(eventsData.data.listEvents.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={events}
        renderItem={({item}) => <Event event={item}/>}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchEvents}
       // ListHeaderComponent={UserFleetsList}
      />
    </View>
  );
};

export default Feed;