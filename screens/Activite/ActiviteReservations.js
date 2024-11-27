import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header';

export default function ActiviteReservations({ navigation, route }) {
  const { activity } = route.params;

  // Données fictives
  const reservations = [
    { id: 1, name: 'Amel.A26', email: 'amelwithlove@gmail.com', status: 'confirmed' },
    { id: 2, name: 'Nouhaila.B90', email: 'nouhaila.b@gmail.com', status: 'confirmed' },
    { id: 3, name: 'Hugo.M76', email: 'hugo.mfebvre@gmail.com', status: 'confirmed' },
    { id: 4, name: 'Julien.A12', email: 'julienAkl@hotmail.fr', status: 'confirmed' },
    { id: 5, name: 'Léa.L59', email: 'lea.Loreau@fakemail.net', status: 'confirmed' },
    { id: 6, name: 'Lucas.B04', email: 'lucasBertrand@hotmail.fr', status: 'confirmed' },
    { id: 7, name: 'Camille.Z37', email: 'Annulé', status: 'cancelled' },
  ];

  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>

      <Header title="Réservations activité" />

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.activityTitle}>{activity.nomActivite}</Text>
            <View style={styles.participantsInfo}>
              <Ionicons name="people-outline" size={24} color="#510D0A" />
              <Text style={styles.participantsText}>
                {confirmedCount}/{activity.nbPlaces}
              </Text>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <View
            style={[
              styles.reservationItem,
              item.status === 'cancelled' ? styles.cancelledItem : styles.confirmedItem,
            ]}
          >
            <Text style={styles.reservationIndex}>{item.id}</Text>
            <View style={styles.reservationInfo}>
              <Text style={styles.reservationName}>{item.name}</Text>
              <Text style={styles.reservationEmail}>{item.email}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#510D0A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#510D0A',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:85,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  participantsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#510D0A',
  },
  reservationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  confirmedItem: {
    backgroundColor: '#CDD993',
  },
  cancelledItem: {
    backgroundColor: '#DBBBBA',
  },
  reservationIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#510D0A',
    marginRight: 15,
  },
  reservationInfo: {
    flex: 1,
  },
  reservationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  reservationEmail: {
    fontSize: 14,
    color: '#510D0A',
  },
});
