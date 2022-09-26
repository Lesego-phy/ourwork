import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './styles.js';

const TypeScreen = (props) => {
  const [text, onChangeText] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={{justifyContent: 'space-between'}}>
      <View style={styles.row}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder= 'type of event? '
      />
        <View style={styles.iconContainer}>
             <FontAwesome5 name="user-clock" size={25} color={'#4B0082'} />
        </View>

      </View>

      <Pressable
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'Explore',
            params: {
              screen: 'SearchResults',
              params: {
                //eventtype: ,
                viewport: route.params.viewport,
              }
            },
          })
        }
        style={{
          marginBottom: 20,
          backgroundColor: '#f15454',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          marginHorizontal: 20,
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          Search
        </Text>
      </Pressable>
    </View>
  );
};

export default GuestsScreen;
