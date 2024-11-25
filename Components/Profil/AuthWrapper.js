import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AuthWrapper() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          // Si l'utilisateur est connecté, redirigez vers la page de profil
          navigation.navigate('Profil', {userId});
        } else {
          // Sinon, redirigez vers la page de connexion
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'état de connexion:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#510D0A" />
      </View>
    );
  }

  return null; // Cet écran ne sera jamais affiché directement
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
