import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header';
import { updateReview } from '../../services/reviewService';

export default function EditReviewPage({ route, navigation }) {
  const { review } = route.params;
  const [note, setNote] = useState(review.note);
  const [commentaire, setCommentaire] = useState(review.commentaire);

  const handleStarPress = (star) => {
    setNote(star);
  };

  const handleSubmit = async () => {
    if (!note || !commentaire.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    await updateReview(review.idAvis, {note, commentaire, idActivite: review.idActivite, userId: review.userId, dateAvis: review.dateAvis});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Modifier l'avis" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.label}>Note</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Ionicons
                name={star <= note ? 'star' : 'star-outline'}
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
          value={commentaire}
          onChangeText={setCommentaire}
          multiline
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Mettre à jour</Text>
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
