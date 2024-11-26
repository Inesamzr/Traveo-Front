import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReviewSummary({ rating, reviewsCount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      <View style={styles.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Ionicons
            key={index}
            name={index < Math.round(rating) ? 'star' : 'star-outline'}
            size={20}
            color="#D9A5B3"
          />
        ))}
      </View>
      <Text style={styles.text}>Basé sur {reviewsCount} avis</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5D4DB',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D9A5B3',
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: '#7D7D7D',
  },
});
