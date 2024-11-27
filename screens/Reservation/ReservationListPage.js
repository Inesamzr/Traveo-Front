import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Reservation from '../../Components/Reservation/Reservation';
import Header from '../../Components/Header';
import { getAllReservations } from '../../services/reservationService'; // Service pour récupérer les réservations
import AsyncStorage from '@react-native-async-storage/async-storage';

function ReservationListPage({ navigation }) {
  const [reservations, setReservations] = useState([]); // Liste des réservations
  const [userId, setUserId] = useState(null); // Stockage de l'utilisateur connecté
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    const fetchUserAndReservations = async () => {
      try {
        // Récupération de l'ID utilisateur connecté depuis AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);

        // Récupération des réservations depuis l'API
        const response = await getAllReservations();
        // Filtrer les réservations pour l'utilisateur connecté
        const userReservations = response.filter(
          (reservation) => reservation.userId === parseInt(storedUserId)
        );
        setReservations(userReservations);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchUserAndReservations();
  }, []);

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
        {/* Afficher uniquement les réservations filtrées */}
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













