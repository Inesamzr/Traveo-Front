import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getCityFromCoordinates } from '../../services/Nominatim';
import { getThemeById } from '../../services/themeService';
import { getUserById } from '../../services/userService';
import { getActivityById } from '../../services/activityService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReservationDetailsPage({ route, navigation }) {
  const { reservation } = route.params; // Récupère la réservation depuis les paramètres de navigation
  const [adresse, setAdresse] = useState('');
  const [theme, setTheme] = useState(null);
  const [hote, setHote] = useState('?');
  const [activite, setActivite] = useState({});
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Récupérer l'utilisateur connecté
        const storedUserId = await AsyncStorage.getItem('userId');
        const connectedUserId = parseInt(storedUserId);

        // Vérification si l'utilisateur est le propriétaire de la réservation
        setIsOwner(true); // L'utilisateur est autorisé

        // Récupération des détails de l'activité
        const activityData = await getActivityById(reservation.activiteId);
        setActivite(activityData);

        // Récupération de la ville
        if (activityData.latitude && activityData.longitude) {
          const city = await getCityFromCoordinates(activityData.latitude, activityData.longitude);
          setAdresse(city);
        } else {
          setAdresse('Adresse non disponible');
        }

        // Récupération du thème
        if (activityData.themeId) {
          const themeData = await getThemeById(activityData.themeId);
          setTheme(themeData);
        }

        // Récupération des informations de l'hôte
        if (activityData.userId) {
          const userData = await getUserById(activityData.userId);
          setHote(`${userData.firstName} ${userData.lastName}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails :', error);
      }
    };

    fetchDetails();
  }, [reservation]);

  const handleCancelReservation = () => {
    Alert.alert(
      'Annuler la réservation',
      'Êtes-vous sûr de vouloir annuler cette réservation ?',
      [
        { text: 'Non', style: 'cancel' },
        { text: 'Oui', onPress: () => Alert.alert('Réservation annulée.') },
      ]
    );
  };

  if (!isOwner) {
    return null; // Ne pas afficher les détails si l'utilisateur n'est pas autorisé
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Image avec icône de retour */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/activity-image-placeholder.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Conteneur du titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activite.nomActivite || 'Nom non disponible'}</Text>
        </View>

        {/* Détails */}
        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="person-circle-outline" size={20} color="#BC4749" />
              <Text style={styles.infoText}>{hote}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={20} color="#BC4749" />
              <Text style={styles.infoText}>{activite.nbPlaces}</Text>
            </View>
            <View style={styles.infoItem}>
              {theme?.image_default && (
                <MaterialCommunityIcons name={theme.image_default} size={20} color="#BC4749" />
              )}
              <Text style={styles.infoText}>{theme?.label}</Text>
            </View>
          </View>

          {/* Sections supplémentaires */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{activite.description || 'Non disponible'}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lieu de RDV</Text>
            <Text style={styles.sectionContent}>{adresse}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates</Text>
            <Text style={styles.sectionContent}>
              du {activite.dateDebut || 'N/A'} au {activite.dateFin || 'N/A'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prix</Text>
            <Text style={styles.sectionContent}>
              {activite.prix ? `${activite.prix} €` : 'Non disponible'}
            </Text>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelReservation}>
            <Text style={styles.cancelButtonText}>Annuler ma réservation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton}
            onPress={() => navigation.navigate('ActivityReviews', {activiteId: reservation.activiteId})}
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
  scrollView: {
    marginBottom: 90,
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
    paddingTop: 20,
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
    backgroundColor: '#F2D0C9', // Style pour l'arrière-plan du titre de section
    alignSelf: 'flex-start',
    paddingRight: 10,
    paddingLeft: 30,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
    marginLeft: -30, // Décalage gauche pour créer l'effet d'encadrement
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
    //marginBottom: 10,
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
    justifyContent: 'center',
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
  cancelButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    margin: 20,
  },
  cancelButtonText: {
    color: '#FFF',
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
});

































