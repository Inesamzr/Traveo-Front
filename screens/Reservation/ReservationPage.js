import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReservationListPage from './ReservationListPage'; // Assurez-vous que le chemin est correct
import Header from '../../Components/Header';

export default function ReservationPage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* En-tête */}
      <Header title="Mes Réservations" />

      {/* Liste des réservations */}
      <View style={styles.content}>
        <ReservationListPage navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  content: {
    flex: 1,
  },
});
