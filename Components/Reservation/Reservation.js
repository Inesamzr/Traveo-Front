import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../localization/LanguageContext'; // Import du contexte
import texts from '../../localization/localization'; // Import des traductions
import { getActivityById } from '../../services/activityService'; // Service pour récupérer une activité
import { getCityFromCoordinates } from '../../services/Nominatim'; // Service pour récupérer la ville
import { getThemeById } from '../../services/themeService'; // Service pour récupérer un thème
import { useNavigation } from '@react-navigation/native';

const Reservation = ({ activiteId, dateReservation }) => {
  const { language } = useLanguage(); // Récupération de la langue active
  const [activite, setActivite] = useState({});
  const [location, setLocation] = useState('');
  const [theme, setTheme] = useState(null); // État pour stocker le thème
  const [status, setStatus] = useState("Passée")

  const navigation = useNavigation();

  // Récupération des détails de l'activité, du lieu et du thème
  useEffect(() => {
    const fetchActivityAndThemeDetails = async () => {
      try {
        // Récupérer les détails de l'activité
        const activityData = await getActivityById(activiteId);
        setActivite(activityData);
  
        // Comparer les dates pour définir le statut
        const today = new Date(); // Date actuelle
        const activityEndDate = new Date(activityData.dateFin); // Convertir la date de fin en objet Date
  
        if (activityEndDate >= today) {
          setStatus('À venir');
        } else {
          setStatus('Passée');
        }
  
        // Récupérer la ville à partir des coordonnées
        if (activityData.latitude && activityData.longitude) {
          const city = await getCityFromCoordinates(activityData.latitude, activityData.longitude);
          setLocation(city);
        } else {
          setLocation('Coordonnées non disponibles');
        }
  
        // Récupérer le thème si un themeId est présent
        if (activityData.themeId) {
          const themeData = await getThemeById(activityData.themeId);
          setTheme(themeData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'activité ou du thème :', error);
        setLocation('Erreur lors de la récupération de la ville');
      }
    };
  
    fetchActivityAndThemeDetails();
  }, [activiteId]);
  

  return (
    <View
      style={styles.reservationCard}
      accessible={true}
      accessibilityLabel={`${texts[language].reservations.title}: ${activite.nomActivite || 'Chargement...'}, ${dateReservation}, ${status}`}
    >
      {/* Icône principale */}
      <MaterialCommunityIcons name="calendar" size={40} color="#BC4749" />
      <View style={styles.reservationInfo}>
        {/* Titre de l'activité */}
        <Text style={styles.reservationTitle}>{activite.nomActivite || 'Chargement...'}</Text>

        {/* Description */}
        <Text style={styles.reservationDescription} numberOfLines={3}>
          {activite.description || 'Description non disponible'}
        </Text>

        {/* Lieu */}
        <Text style={styles.reservationDetails}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#BC4749" />{' '}
          {location || 'Lieu en cours de chargement...'}
        </Text>

        {/* Date */}
        <Text style={styles.reservationDetails}>
          <MaterialCommunityIcons name="calendar-outline" size={14} color="#BC4749" />{' '}
          {dateReservation}
        </Text>

        {/* Prix */}
        <Text style={styles.reservationDetails}>
          <MaterialCommunityIcons name="currency-eur" size={16} color="#BC4749" />{' '}
          {activite.prix ? `${activite.prix}€` : 'Prix non disponible'}
        </Text>

        {/* Thème (facultatif, à afficher si disponible) */}
        {theme && (
          <Text style={styles.reservationDetails}>
            <MaterialCommunityIcons name="tag-outline" size={14} color="#BC4749" />{' '}
            {theme.label || 'Thème non disponible'}
          </Text>
        )}
      </View>

      {/* Badge de statut */}
      <View
        style={[
          styles.statusBadge,
          status === 'À venir' ? styles.upcomingBadge : styles.pastBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            status === 'À venir' ? styles.upcoming : styles.past,
          ]}
        >
          {status === 'À venir'
            ? texts[language].reservations.status.upcoming
            : texts[language].reservations.status.past}
        </Text>
      </View>

      {/* Bouton Laisser un avis */}
      {status === 'Passée' && (
        <TouchableOpacity style={styles.reviewButton}
        onPress={() => navigation.navigate("AddReview", {activiteId: activite.idActivite})}
        >
          <Text style={styles.reviewButtonText}>
            {texts[language].reservations.buttons.leaveReview}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reservationCard: {
    flexDirection: 'row',
    backgroundColor: '#FADCD9',
    borderRadius: 20,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reservationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  reservationDescription: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    lineHeight: 16,
    maxHeight: 48, // Limite à 3 lignes
    overflow: 'hidden',
  },
  reservationDetails: {
    fontSize: 12,
    color: '#510D0A',
    marginBottom: 5,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  upcomingBadge: {
    backgroundColor: '#E8F5E9', // Fond vert clair pour "À venir"
  },
  pastBadge: {
    backgroundColor: '#FFEBEE', // Fond rouge clair pour "Passée"
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upcoming: {
    color: '#388E3C', // Texte vert pour "À venir"
  },
  past: {
    color: '#D32F2F', // Texte rouge pour "Passée"
  },
  reviewButton: {
    backgroundColor: '#510D0A',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-end', // Pour aligner le bouton à droite
  },
  reviewButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Reservation;






