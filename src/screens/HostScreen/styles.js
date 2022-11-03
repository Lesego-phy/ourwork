import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      backgroundColor: 'white'
    },
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    button: {
      backgroundColor: Colors.light.tint,
      borderRadius: 30,
    },
    buttonText: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
    },
    newEventContainer: {
      flexDirection: 'row',
      padding: 15,
    },
    inputsContainer: {
      marginLeft: 10,
    },
    eventInput: {
      height: 100,
      maxHeight: 300,
      fontSize: 20,
    },
    pickImage: {
      fontSize: 18,
      color: Colors.light.tint,
      marginVertical: 10,
    },
    image: {
      width: 150,
      height: 150,
    },
    textInput: {
      padding: 10,
      backgroundColor: '#eee',
      marginVertical: 5,
      marginLeft: 20,
    },
   separator: {
      backgroundColor: '#efefef',
      height: 1,
    },
    listView: {
      position: 'absolute',
        top: 105,
    },
    autocompleteContainer: {
      position: 'absolute',
      top: 0,
      left: 10,
      right: 10,
    },
  });

  export default styles;