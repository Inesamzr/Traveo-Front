import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilHeader from '../../Components/Profil/ProfilHeader';
import ProfilField from '../../Components/Profil/ProfilField';
import ProfilButton from '../../Components/Profil/ProfilButton';
import ReviewsSection from '../../Components/Review/ReviewsSection';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';
import { getUserById, updateUserProfile } from '../../services/userService';
import { getUserActivities } from '../../services/activityService';
import { getReviewsOfUser } from '../../services/reviewService';

export default function ProfilPage({ route, navigation }) {
  const { userId } = route.params;
  const { language } = useLanguage();
  const currentTexts = texts[language];

  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [isCurrentUser, setIsCurrentUser] = useState(true); // Vérifie si le userId correspond
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [isModified, setIsModified] = useState(false); // État pour savoir si le profil est modifié
  const [activities, setActivities] = useState([]);
  const [reviews, setReviews] = useState([]); // Avis utilisateur

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
        setPhoneNumber(userData.phoneNumber);
        setRole(userData.role);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de charger les données utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    const fetchActiviteData = async () => {
      try {
        const activitesData = await getUserActivities(userId);
        console.log("djdjjdjdjjdjdjdj " , activitesData.data)
        setActivities(activitesData.data);
        console.log("djdjjdjdjjdjdjdj " , activitesData.data)
      } catch (error) {
        console.lof('Erreur', "Impossible de charger les données des activités de l'utilisateur");
      }
    };

    const fetchReviews = async () => {
      try {
        const userReviews = await getReviewsOfUser(userId);
        setReviews(userReviews);
        console.log("fnzenf ", userReviews)
      } catch (error) {
        console.log('Erreur', "Impossible de charger les données des avis de l'utilisateur");
      }
    };

    fetchUserData();
    fetchActiviteData();
    fetchReviews();
  }, []);

  const handleFieldChange = (field, value) => {
    if (field === 'firstName') {
      setFirstName(value);
      if (lastName) {
        setUsername(`${value}.${lastName.substring(0, 2).toLowerCase()}`); // Met à jour le username par défaut
      }
    }

    if (field === 'lastName') {
      setLastName(value);
      if (firstName) {
        setUsername(`${firstName}.${value.substring(0, 2).toLowerCase()}`); // Met à jour le username par défaut
      }
    }
    setIsModified(true); // Indique que des modifications ont été faites
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(userId, { firstName, lastName, email, userId, username, phoneNumber }); // Met à jour les données utilisateur
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
      <ProfilHeader name={`${username}`} />
      {isCurrentUser && (
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
            label={currentTexts.phoneNumber}
            value={phoneNumber}
            icon="call-outline"
            editable
            keyboardType="phone-pad"
            onChangeText={(value) => handleFieldChange('phoneNumber', value)}
          />
          <ProfilField
            label="Email"
            value={email}
            icon="mail"
            onChangeText={(value) => handleFieldChange('email', value)}
          />
        </View>
      )}
      {isCurrentUser && isModified && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      )}
      {isCurrentUser && (
        <>
          <ProfilButton label="Mes activités" onPress={() => navigation.navigate('ActivityListUser', { activities })} />
          {role === 'admin' && <ProfilButton label="Thèmes d'activités" onPress={() => navigation.navigate('Themes')} />}
        </>
      )}
      {reviews && reviews != 0 && (
        <ReviewsSection reviews={reviews} />
      )}
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
