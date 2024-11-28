import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import ReviewsSection from '../../Components/Review/ReviewsSection';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header';
import { fetchReviewsByReservationId } from '../../services/reviewService';

export default function ActivityReviewsPage({ route, navigation }) {
  const { activiteId } = route.params;
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
        const response = await fetchReviewsByReservationId(activiteId)
        setReviews(response);
        console.log(response)
     }
     fetchDetails();
  },[activiteId])


  const handleAddReviewPress = () => {
    console.log(".  " , activiteId)
    navigation.navigate('AddReview', {activiteId});
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Avis" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <ReviewsSection reviews={reviews} />
      <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReviewPress}>
        <Text style={styles.addReviewButtonText}>Ajouter un avis</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
    padding: 20,
    paddingBottom: 30
  },
  backIcon: {
    marginTop: 40,
    padding: 8,
    borderRadius: 20,
  },
  addReviewButton: {
    backgroundColor: '#386641',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',

  },
  addReviewButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
