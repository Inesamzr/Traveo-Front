import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getCityFromCoordinates } from '../../services/Nominatim';
import { getUserById } from '../../services/userService';
import { getThemeById } from '../../services/themeService';

export default function ActivityDetailsPage({ route, navigation }) {
  const { activity } = route.params;
  const [adresse, setAdresse] = useState('');
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('');
  const [userId, setUserId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Récupérer les informations utilisateur
    const fetchUserData = async () => {
      try {
        // Récupérer le userId depuis AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(Number(storedUserId));

        // Comparer le userId
        if (Number(storedUserId) === activity.userId) {
          setIsOwner(true);
        }
      } catch (error) {
        Alert.alert('Erreur', "Impossible de récupérer l'identifiant utilisateur.");
      }
    };

    // Récupérer la ville basée sur les coordonnées
    const fetchAdressLoc = async () => {
      try {
        const responseAdresse = await getCityFromCoordinates(activity.latitude, activity.longitude);
        setAdresse(responseAdresse);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de récupérer l'adresse.");
      }
    };

    // Récupérer le username de l'utilisateur
    const fetchUsername = async () => {
      try {
        const userData = await getUserById(activity.userId);
        setUsername(userData.firstName + '.' + userData.lastName);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de récupérer les informations de l'utilisateur.");
      }
    };

    // Récupérer le thème
    const fetchTheme = async () => {
      try {
        const responseTheme = await getThemeById(activity.themeId);
        setTheme(responseTheme);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de récupérer le thème.");
      }
    };

    fetchUserData();
    fetchAdressLoc();
    fetchUsername();
    fetchTheme();
  }, [activity.userId]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contenu}>
        {/* Image avec l'icône de retour */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/activity-image-placeholder.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="#510D0A" />
          </TouchableOpacity>
        </View>

        {/* Conteneur avec le titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activity.nomActivite}</Text>
        </View>

        {/* Détails de l'activité */}
        <View style={styles.detailsContainer}>
        <View style={styles.infoRow}>
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => navigation.navigate('Profil', { userId: activity.userId })}
          >
            <Ionicons name="person-circle-outline" size={20} color="#BC4749" />
            <Text style={styles.infoText}>{username}</Text>
          </TouchableOpacity>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={20} color="#BC4749" />
            <Text style={styles.infoText}>x / {activity.nbPlaces}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name={theme.image_default || 'help-circle-outline'}
              size={22}
              color="#BC4749"
            />
            <Text style={styles.infoText}>{theme.label || 'Thème inconnu'}</Text>
          </View>
        </View>

          {/* Sections détaillées */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.description}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Lieu de RDV</Text>
            </View>
            <Text style={styles.sectionContent}>{adresse}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Dates</Text>
            </View>
            <Text style={styles.sectionContent}>
              du {activity.dateDebut} au {activity.dateFin}
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Prix</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.prix} €</Text>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Place Diponibles</Text>
            </View>
            <Text style={styles.sectionContent}>x / {activity.nbPlaces}</Text>
            </View>
            <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Tags</Text>
            </View>
            <View style={styles.tagsContainer}>
                {activity.tags.split(',').map((tag, index) => (
                <View
                    key={index}
                    style={[styles.tag, index % 2 === 0 ? styles.tagEven : styles.tagOdd]}
                >
                    <Text
                    style={[
                        styles.tagText,
                        index % 2 === 0 ? styles.tagTextEven : styles.tagTextOdd,
                    ]}
                    >
                    #{tag.trim()}
                    </Text>
                </View>
                ))}
            </View>
            </View>

        </View>

        {/* Boutons en bas */}
        <View style={styles.buttonContainer}>
          {isOwner && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditActivite', { activity })}
            >
              <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>M'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton}
        onPress={() => navigation.navigate('ActivityReviews', { reviews: activity.reviews, rating: 3, reviewsCount: activity.reviews.length })}
        >
          <Text style={styles.reviewButtonText}>Avis</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  contenu:{
    marginBottom:90,
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  titleContainer: {
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    backgroundColor: '#510D0A',
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop:20,
    backgroundColor: '#F2E8CF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  infoRow: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  infoText: {
    fontSize: 16,
    color: '#510D0A',
    fontWeight: 'bold',
    marginLeft: 5, 
  },
  section: {
    marginBottom: 15,
  },
  sectionTitleContainer: {
    backgroundColor: '#F2D0C9', 
    alignSelf: 'flex-start', 
    paddingRight: 10, 
    paddingLeft: 30, 
    paddingVertical: 5, 
    borderRadius: 15, 
    marginBottom: 10, 
    marginLeft: -30, 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },  
  sectionContent: {
    fontSize: 14,
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, 
    marginTop: 10,
    justifyContent: 'center', 
  },
  tag: {
    backgroundColor: '#F2D0C9',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagEven: {
    backgroundColor: '#F2D0C9', 
  },
  tagOdd: {
    backgroundColor: '#DBBBBA', 
  },
  tagTextEven: {
    color: '#510D0A', 
  },
  tagTextOdd: {
    color: '#FFF', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: '#CDD993',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  registerButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: '#F2D0C9',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  reviewButtonText: {
    color: '#510D0A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: 
  { 
    backgroundColor: '#510D0A', 
    padding: 10, 
    borderRadius: 20 
  },
  editButtonText: { 
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
