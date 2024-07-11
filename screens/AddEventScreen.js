import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const takePhoto = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const saveEvent = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Title and description are required.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date: new Date().toLocaleDateString(),
      photo,
    };

    const storedEvents = await AsyncStorage.getItem('events');
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    events.push(newEvent);

    await AsyncStorage.setItem('events', JSON.stringify(events));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} color="#d32f2f" />
      <Button title="Take a photo" onPress={takePhoto} color="#d32f2f" />
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <Button title="Save Event" onPress={saveEvent} color="#d32f2f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  photo: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
});

export default AddEventScreen;








