import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../localization/LanguageContext'; // Import du contexte
import texts from '../../localization/localization'; // Import des traductions

const Reservation = ({ ...reservation }) => {
  const { language } = useLanguage(); // Récupération de la langue active

  return (
    <View
      style={styles.reservationCard}
      accessible={true}
      accessibilityLabel={`${texts[language].reservations.title}: ${reservation.nom}, ${reservation.date}, ${reservation.status}`}
    >
      {/* Icône principale */}
      <MaterialCommunityIcons name="calendar" size={40} color="#BC4749" />
      <View style={styles.reservationInfo}>
        {/* Titre de la réservation */}
        <Text style={styles.reservationTitle}>{reservation.nom}</Text>

        {/* Description */}
        <Text style={styles.reservationDescription} numberOfLines={3}>
          {reservation.description}
        </Text>

        {/* Lieu */}
        <Text style={styles.reservationDetails}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#BC4749" />{" "}
          {reservation.lieu}
        </Text>

        {/* Date */}
        <Text style={styles.reservationDetails}>
          <MaterialCommunityIcons name="calendar-outline" size={14} color="#BC4749" />{" "}
          {reservation.date}
        </Text>

        {/* Prix */}
        <Text style={styles.reservationDetails}>
          <MaterialCommunityIcons name="currency-eur" size={16} color="#BC4749" />{" "}
          {reservation.prix}
        </Text>

        {/* Thème (facultatif, à afficher si disponible) */}
        {reservation.theme && (
          <Text style={styles.reservationDetails}>
            <MaterialCommunityIcons name="tag-outline" size={14} color="#BC4749" />{" "}
            {reservation.theme}
          </Text>
        )}
      </View>

      {/* Badge de statut */}
      <View
        style={[
          styles.statusBadge,
          reservation.status === "À venir" ? styles.upcomingBadge : styles.pastBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            reservation.status === "À venir" ? styles.upcoming : styles.past,
          ]}
        >
          {reservation.status === "À venir"
            ? texts[language].reservations.status.upcoming
            : texts[language].reservations.status.past}
        </Text>
      </View>

      {/* Bouton Laisser un avis */}
      {reservation.status === "Passée" && (
        <TouchableOpacity style={styles.reviewButton}>
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




