import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { logout } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../localization/LanguageContext';
import texts from '../../localization/localization'

export default function ProfilHeader({ name }) {
  const navigation = useNavigation();

  const { language } = useLanguage();
  const currentTexts = texts[language];

  const handleLogout = async () => {
    try {
      await logout(); // Supprimez les données utilisateur du stockage
      Alert.alert('Déconnexion réussie', 'Vous avez été déconnecté.');
      navigation.navigate('Login'); // Redirigez vers la page de connexion
    } catch (error) {
      Alert.alert('Erreur', "Une erreur est survenue lors de la déconnexion.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.backIcon}>
        <MaterialIcons name="logout" size={24} color="#510D0A" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.avatarContainer}>
        <Image
          source={require('../../assets/avatar.png')} // Remplacez par votre image d'avatar
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity
          style={styles.languageButton}
          onPress={() => navigation.navigate('LanguageSelection')}
        >
          <Text style={styles.languageText}>{currentTexts.flag}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDE6C7',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 60,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A5C49F',
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#386641',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },
});
