import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchEvents = async () => {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={() => navigation.navigate('AddEvent')} color="#d32f2f" />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventItem} onPress={() => navigation.navigate('EventDetails', { event: item })}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            {item.photo && <Image source={{ uri: item.photo }} style={styles.eventPhoto} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  eventItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    color: '#333',
  },
  eventPhoto: {
    width: '100%',
    height: 100,
    marginTop: 10,
  },
});

export default HomeScreen;


