import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReviewCard({ name, rating, comment, avatarColor }) {
  return (
    <View style={[styles.container, { backgroundColor: avatarColor }]}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={40} color="#111" />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < rating ? 'star' : 'star-outline'}
                size={16}
                color="#FFD700"
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  comment: {
    marginTop: 10,
    fontSize: 14,
    color: '#111',
  },
});
