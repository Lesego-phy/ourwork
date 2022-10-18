import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreNavigator from './ExploreNavigator';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import HostScreen from '../screens/HostScreen';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PostScreen from "../screens/PostScreen";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#4B0082',
      }}>
      <Tab.Screen
        name={'Explore'}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="search" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Saved'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="download" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Voyage'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Host'}
        component={HostScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="address" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'profile'}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <EvilIcons name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
