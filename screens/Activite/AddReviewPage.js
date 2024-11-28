import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header';
import { addReview } from '../../services/reviewService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddReviewPage({ route, navigation }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const activiteId = route.params.activiteId

  const handleStarPress = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    const userId = await AsyncStorage.getItem("userId")

    const today = new Date();
    const isoDate = today.toISOString().split('T')[0];
    console.log(isoDate)

    const dataResult = await addReview({note: rating, commentaire: comment, userId, idActivite: activiteId, dateAvis: isoDate})
    navigation.navigate("ReservationList");
  };

  return (
    <View style={styles.container}>
      <Header title="Ajouter un avis" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.label}>Note</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={32}
                color="#FFC107"
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Écris un avis</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Commentaire..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Publier l'avis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
    padding: 20,
  },
  backIcon: {
    marginTop: 40,
    padding: 8,
    borderRadius: 20,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#510D0A',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#386641',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#BC4749',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});