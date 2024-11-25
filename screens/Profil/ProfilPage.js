import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import ProfilHeader from '../../Components/Profil/ProfilHeader';
import ProfilField from '../../Components/Profil/ProfilField';
import ProfilButton from '../../Components/Profil/ProfilButton';
import ReviewsSection from '../../Components/Review/ReviewsSection';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';
import { getUserById, updateUserProfile } from '../../services/userService';

export default function ProfilPage({ route, navigation }) {
  const { language } = useLanguage();
  const currentTexts = texts[language];

  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isModified, setIsModified] = useState(false); // État pour savoir si le profil est modifié
  const [reviews, setReviews] = useState([]); // Avis utilisateur

  const { userId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          throw new Error("L'ID utilisateur est introuvable.");
        }
        const userData = await getUserById(userId);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setUsername(userData.username);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de charger les données utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);


  const handleFieldChange = (field, value) => {
    if (field === 'firstName') setFirstName(value);
    if (field === 'lastName') setLastName(value);
    if (field === 'email') setEmail(value);
    setIsModified(true); // Indique que des modifications ont été faites
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(userId, {firstName, lastName, email, userId} ); // Met à jour les données utilisateur
      setIsModified(false); // Réinitialise l'état de modification
      Alert.alert('Succès', 'Profil mis à jour avec succès.');
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'enregistrer les modifications.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#510D0A" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfilHeader name={`${username}`}/>
      <View style={styles.fields}>
        <ProfilField
          label={currentTexts.firstNamePlaceholder}
          value={firstName}
          icon="person"
          editable
          onChangeText={(value) => handleFieldChange('firstName', value)}
        />
        <ProfilField
          label={currentTexts.lastNamePlaceholder}
          value={lastName}
          icon="person"
          editable
          onChangeText={(value) => handleFieldChange('lastName', value)}
        />
        <ProfilField
          label="Email"
          value={email}
          icon="mail"
          editable
          onChangeText={(value) => handleFieldChange('email', value)}
        />
      </View>
      {isModified && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      )}
      <ProfilButton label="Mes activités" onPress={() => navigation.navigate('ActivityList')} />
      <ProfilButton label="Mes réservations" onPress={() => navigation.navigate('Reservations')} />
      <ReviewsSection reviews={reviews} rating={4.8} reviewsCount={reviews.length} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  content: {
    padding: 20,
  },
  fields: {
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: '#386641',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
