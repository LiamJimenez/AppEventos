import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>{event.date}</Text>
      {event.photo && <Image source={{ uri: event.photo }} style={styles.photo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002f6c',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  photo: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
});

export default EventDetailsScreen;




