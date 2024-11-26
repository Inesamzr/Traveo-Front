import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Reservation from '../../Components/Reservation/Reservation';
import Header from '../../Components/Header';

export default function ReservationListPage({ navigation }) {
  const dummyData = [
    {
      id: 1,
      nom: "Vélo en groupe",
      lieu: "Nîmes",
      date: "2024-11-15 06:00:00", // Format ISO pour faciliter la manipulation
      prix: "3€",
      description: "Un joli tour de vélo groupé.",
      theme: "Aventure",
      hote: "Ines.A10",
      participants: "2/6",
      tags: "vélo,visite,histoire,rencontre",
    },
    {
      id: 2,
      nom: "Marche au Lever du Soleil",
      lieu: "Montpellier",
      date: "2024-12-01 06:00:00",
      prix: "6€",
      description: "Profitez d'un beau lever de soleil.",
      theme: "Aventure",
      hote: "Nouhaila.B90",
      participants: "4/10",
      tags: "marche,nature,lever",
    },
    {
      id: 3,
      nom: "Atelier de Peinture en Plein Air",
      lieu: "Montpellier",
      date: "2024-12-13 06:00:00",
      prix: "5€",
      description: "Exprimez votre créativité en plein air.",
      theme: "Créativité",
      hote: "Amel.A26",
      participants: "7/10",
      tags: "peinture,plein-air,créativité",
    },
    {
      id: 4,
      nom: "Dégustation de Vins",
      lieu: "Perpignan",
      date: "2024-12-20 06:00:00",
      prix: "8€",
      description: "Découvrez des vins locaux.",
      theme: "Cuisine",
      hote: "Lucas.B04",
      participants: "5/5",
      tags: "vin,dégustation,cave",
    },
    {
      id: 5,
      nom: "Retraite de Méditation Zen",
      lieu: "Nîmes",
      date: "2024-06-24 06:00:00",
      prix: "10€",
      description: "Relaxez-vous avec une séance de méditation.",
      theme: "Spiritualité",
      hote: "Camille.Z37",
      participants: "8/8",
      tags: "méditation,zen,sérénité",
    },
    {
      id: 6,
      nom: "Randonnée des Cascades",
      lieu: "Montpellier",
      date: "2024-06-30 06:00:00",
      prix: "7€",
      description: "Découvrez des paysages naturels magnifiques.",
      theme: "Aventure",
      hote: "Hugo.M76",
      participants: "6/8",
      tags: "nature,rivière,exploration",
    },
  ];

  // Calcul automatique du statut
  const calculateStatus = (date) => {
    const reservationDate = new Date(date);
    const now = new Date();
    return reservationDate > now ? "À venir" : "Passée";
  };

  // Ajout du statut automatiquement
  const updatedData = dummyData.map((reservation) => ({
    ...reservation,
    status: calculateStatus(reservation.date),
  }));

  return (
    <View style={styles.container}>
      <Header title="Mes Réservations" />
      <ScrollView contentContainerStyle={styles.reservationList}>
        {updatedData.map((reservation) => (
          <TouchableOpacity
            key={reservation.id}
            onPress={() => navigation.navigate('ReservationDetails', { reservation })}
          >
            <Reservation {...reservation} />
          </TouchableOpacity>
        ))}
        {updatedData.length === 0 && (
          <Text style={styles.noReservationsText}>Aucune réservation trouvée</Text>
        )}
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
  noReservationsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#510D0A',
    marginTop: 20,
  },
});









