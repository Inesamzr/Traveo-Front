import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Reservation from '../../Components/Reservation/Reservation';
import Header from '../../Components/Header';
import { getAllReservations } from '../../services/reservationService'; // Service pour récupérer les réservations

function ReservationListPage({ navigation }) {
  const [reservations, setReservations] = useState([]); // Liste des réservations
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  // Récupération des réservations depuis le backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response); // On met à jour les réservations
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchReservations();
  }, []);

  // Fonction pour calculer le statut de chaque réservation
  const calculateStatus = (date) => {
    const reservationDate = new Date(date);
    const now = new Date();
    return reservationDate > now ? "À venir" : "Passée";
  };

  if (loading) {
    return <Text style={styles.loadingText}>Chargement des réservations...</Text>;
  }

  if (reservations.length === 0) {
    return <Text style={styles.noReservationsText}>Aucune réservation trouvée.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <Header title="Mes Réservations" />
      <ScrollView contentContainerStyle={styles.reservationList}>
        {/* Parcours des réservations */}
        {reservations.map((reservation) => (
          <TouchableOpacity
            key={reservation.reservationId}
            onPress={() =>
              navigation.navigate('ReservationDetails', { reservation })
            } // Navigation vers les détails de la réservation
          >
            <Reservation
              activiteId={reservation.activiteId} // Envoi de l'ID de l'activité
              dateReservation={reservation.dateReservation} // Envoi de la date
              status={calculateStatus(reservation.dateReservation)} // Calcul et envoi du statut
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  reservationList: {
    paddingTop: 100,
    paddingBottom: 80,
    paddingHorizontal: 15,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#510D0A',
    marginTop: 20,
  },
  noReservationsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#510D0A',
    marginTop: 20,
  },
});

export default ReservationListPage;













