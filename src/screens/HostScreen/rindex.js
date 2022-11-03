import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';


import { Text, View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { createEvent } from '../src/graphql/mutations';
import PlaceRow from './PlaceRow';


const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default function NewEventScreen() {

  const [eventType, setEventType] = useState("");
  const [event, setEvent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [originPlace, setOriginPlace] = useState(null);

  const navigation = useNavigation();

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length - 1];

      const key = `${uuidv4()}.${extension}`;

      await Storage.put(key, blob);

      return key;

    } catch (e) {
      console.log(e);
    }
    return '';
  }

  const onHostEvent = async () => {
    let image;
    if (!!imageUrl) {
      image = await uploadImage();
    }

    try {
      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

      const newEvent = {
        content: event,
        image,
        userID: currentUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(createEvent, { input: newEvent }));
      navigation.navigate('SearchResults');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHostEvent}>
          <Text style={styles.buttonText}>Host</Text>
        </TouchableOpacity>
      </View>

       <View style={styles.inputsContainer}>
          <TextInput
            value={eventType}
            onChangeText={(value) => setEventType(value)}
            //multiline={true}
            //numberOfLines={3}
            style={styles.eventInput}
            placeholder={"What type of event?"}
          />
        </View>

        <GooglePlacesAutocomplete
          placeholder="Where are you?"
          onPress={(data, details = null) => {
            setOriginPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDFhFUaYpyAjNE4Eq-sWCGWjrr6kyGnhbQ',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />


      <View style={styles.newEventContainer}>
        <ProfilePicture image={'https://scontent.fkiv3-1.fna.fbcdn.net/v/t31.0-8/s960x960/22256588_1932617800312085_5686197942193420542_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=svjjE7DUkc0AX9yjcdC&_nc_ht=scontent.fkiv3-1.fna&tp=7&oh=1df4116c73c45a32ebad070704ca3333&oe=5F6ECD77'}/>
        <View style={styles.inputsContainer}>
          <TextInput
            value={event}
            onChangeText={(value) => setEvent(value)}
            multiline={true}
            numberOfLines={3}
            style={styles.eventInput}
            placeholder={"description of the event?"}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.pickImage}>Pick a image</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      </View>
    </SafeAreaView>
  );
}