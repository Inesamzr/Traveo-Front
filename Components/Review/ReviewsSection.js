import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ReviewSummary from './ReviewSummary';
import ReviewCard from './ReviewCard';

export default function ReviewsSection({ reviews, rating, reviewsCount }) {
  const [visibleReviews, setVisibleReviews] = useState(2); // Nombre d'avis visibles

  const handleSeeMore = () => {
    if (visibleReviews < reviews.length) {
      setVisibleReviews(visibleReviews + 2); // Affiche 2 avis supplémentaires
    } else {
      console.log('Tous les avis sont déjà affichés');
    }
  };

  return (
    <View style={styles.container}>
      <ReviewSummary rating={rating} reviewsCount={reviewsCount} />
      {reviews.slice(0, visibleReviews).map((review, index) => (
        <ReviewCard
          key={index}
          name={review.name}
          rating={review.rating}
          comment={review.comment}
          avatarColor={index % 2 === 0 ? '#DDE6C7' : '#F5D4DB'}
        />
      ))}
      {visibleReviews < reviews.length && (
        <TouchableOpacity style={styles.button} onPress={handleSeeMore}>
          <Text style={styles.buttonText}>Voir plus d'avis</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 80
  },
  button: {
    backgroundColor: '#D9A5B3',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
