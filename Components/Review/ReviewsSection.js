import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import ReviewSummary from './ReviewSummary';
import ReviewCard from './ReviewCard';
import { deleteReview } from '../../services/reviewService';
import { useNavigation } from '@react-navigation/native';

export default function ReviewsSection({ reviews }) {
  const [visibleReviews, setVisibleReviews] = useState(2); // Nombre d'avis visibles
  const reviewsCount = reviews.length
  const rating = (reviews.reduce((sum, review) => sum + review.note, 0)/reviewsCount).toFixed(1)

  const navigation = useNavigation()

  const handleSeeMore = () => {
    if (visibleReviews < reviews.length) {
      setVisibleReviews(visibleReviews + 2); // Affiche 2 avis supplémentaires
    } else {
      console.log('Tous les avis sont déjà affichés');
    }
  };

  const handleDelete = async (reviewId) => {
    Alert.alert(
      "Supprimer l'avis",
      "Êtes-vous sûr de vouloir supprimer cet avis ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              await deleteReview(reviewId);
              Alert.alert("Succès", "L'avis a été supprimé avec succès.");
              // Supprimer l'avis localement
              setVisibleReviews(visibleReviews - 1);
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer l'avis. Réessayez plus tard.");
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const handleUpdate = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.idAvis === reviewId);
    if (reviewToEdit) {
      navigation.navigate('EditReview', { review: reviewToEdit });
    } else {
      console.error('Avis non trouvé pour l\'ID:', reviewId);
    }
  };
  

  return (
    <View style={styles.container}>
      <ReviewSummary rating={rating} reviewsCount={reviewsCount} />
      {reviews &&
        reviews.slice(0, visibleReviews).map((review, index) => (
          <ReviewCard
            key={index}
            id={review.idAvis}
            userId={review.userId}
            rating={review.note}
            comment={review.commentaire}
            avatarColor={index % 2 === 0 ? '#DDE6C7' : '#F5D4DB'}
            onDelete={handleDelete}
            onEdit={handleUpdate}
          />
        ))}
      {reviews && visibleReviews < reviews.length && (
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
    marginBottom: 80,
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
