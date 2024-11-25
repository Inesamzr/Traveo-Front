import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function CreerActivitePage() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [nombreDePlace, setNombreDePlace] = useState('');
  const [prix, setPrix] = useState('');
  const [heureDepart, setHeureDepart] = useState('');
  const [heureArrive, setHeureArrive] = useState('');
  const [altitude, setAltitude] = useState('');
  const [longitude, setLongitude] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#510D0A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créer une activité</Text>
        <TouchableOpacity>
          <FontAwesome5 name="user-circle" size={24} color="#510D0A" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Nom */}
        <Text style={styles.label}>Nom*</Text>
        <TextInput
          style={styles.input}
          placeholder="Balade en vélo"
          value={nom}
          onChangeText={setNom}
        />

        {/* Description */}
        <Text style={styles.label}>Description*</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Nous allons nous balader en groupe..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Thème */}
        <Text style={styles.label}>Thème*</Text>
            <View style={styles.pickerContainer}>
            <Picker
                selectedValue={theme}
                onValueChange={(itemValue) => setTheme(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Choisir..." value="" />
                <Picker.Item label="Randonnée" value="randonnee" />
                <Picker.Item label="Vélo" value="velo" />
                <Picker.Item label="Kayak" value="kayak" />
            </Picker>
            </View>


        {/* Date */}
        <Text style={styles.label}>Date*</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="JJ/MM/AA"
            value={date}
            onChangeText={setDate}
          />
          <Ionicons name="calendar-outline" size={24} color="#510D0A" style={styles.icon} />
        </View>

        {/* Nombre de Place */}
        <Text style={styles.label}>Nombre de Place*</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="3"
            value={nombreDePlace}
            onChangeText={setNombreDePlace}
            keyboardType="numeric"
          />
          <FontAwesome5 name="users" size={24} color="#510D0A" style={styles.icon} />
        </View>

        {/* Prix */}
        <Text style={styles.label}>Prix*</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="50"
            value={prix}
            onChangeText={setPrix}
            keyboardType="numeric"
          />
          <FontAwesome5 name="euro-sign" size={24} color="#510D0A" style={styles.icon} />
        </View>

        {/* Heure Départ */}
        <Text style={styles.label}>Heure Départ*</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="6:00"
            value={heureDepart}
            onChangeText={setHeureDepart}
          />
          <Ionicons name="time-outline" size={24} color="#510D0A" style={styles.icon} />
        </View>

        {/* Heure Arrivé */}
        <Text style={styles.label}>Heure Arrivé*</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="12:00"
            value={heureArrive}
            onChangeText={setHeureArrive}
          />
          <Ionicons name="time-outline" size={24} color="#510D0A" style={styles.icon} />
        </View>

        {/* Altitude */}
        <Text style={styles.label}>Altitude*</Text>
        <TextInput
          style={styles.input}
          placeholder="1234678"
          value={altitude}
          onChangeText={setAltitude}
          keyboardType="numeric"
        />

        {/* Longitude */}
        <Text style={styles.label}>Longitude*</Text>
        <TextInput
          style={styles.input}
          placeholder="1234678"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />

        {/* Image */}
        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imageUpload}>
          <Text style={styles.imageUploadText}>Glisser et déposer ou charger l'image</Text>
          <Ionicons name="cloud-upload-outline" size={24} color="#510D0A" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F4EC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9E3E2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#510D0A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  textarea: {
    height: 80,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    color: '#510D0A',
  },  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageUploadText: {
    fontSize: 14,
    color: '#510D0A',
  },
});
