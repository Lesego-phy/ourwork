/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, } from 'react-native';

import Router from './src/navigation/Router';

import HomeScreen from './src/screens/Home';

import { withAuthenticator } from 'aws-amplify-react-native';

navigator.geolocation = require('@react-native-community/geolocation');

// import Amplify from 'aws-amplify'
// import config from './aws-exports'
// Amplify.configure(config)

const App: () => React$Node = () => {

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Voyage location Permissions",
          message:
            "Voyage App needs access to your location " +
            "so you can get event updates based on where you are.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, [])
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
    </>
  );
};

export default withAuthenticator(App);
