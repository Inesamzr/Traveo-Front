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

export default function ProfilPageOthers({ route, navigation }) {
  const { userId } = route.params;
  const { language } = useLanguage();
  const currentTexts = texts[language];

  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [username, setUsername] = useState('');
  const [reviews, setReviews] = useState([]); // Avis utilisateur
  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        if (!userId) {
          throw new Error("L'ID utilisateur est introuvable.");
        }
        const userData = await getUserById(userId);
        setUsername(userData.username);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de charger les données utilisateur.");
      } finally {
        setLoading(false);
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
    fetchReviews();
  }, []);

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
      {!loading && (
        <ProfilButton label="Ses activités" onPress={() => navigation.navigate('ActivityListUser', { userId })} />
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
