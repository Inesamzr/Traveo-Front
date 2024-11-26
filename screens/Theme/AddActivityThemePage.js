import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createTheme } from '../../services/themeService';
import Header from '../../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const logoOptions = [
  { label: 'Randonnée', value: 'hiking', icon: () => <MaterialCommunityIcons name="hiking" size={24} color="#510D0A" /> },
  { label: 'Cuisine', value: 'utensils', icon: () => <FontAwesome5 name="utensils" size={24} color="#510D0A" /> },
  { label: 'Méditation', value: 'meditation', icon: () => <MaterialCommunityIcons name="meditation" size={24} color="#510D0A" /> },
  { label: 'Peinture', value: 'brush', icon: () => <MaterialCommunityIcons name="brush" size={24} color="#510D0A" /> },
];

export default function AddActivityThemePage() {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [image_default, setImage] = useState(null);
  const [open, setOpen] = useState(false); // État pour ouvrir/fermer le menu déroulant
  const [items, setItems] = useState(logoOptions); // Options du menu déroulant

  const navigation = useNavigation();


  const handleSubmit = async () => {
    
    if (!label || !description || !image_default) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    await createTheme({label, description, image_default});
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <Header title='Ajouter une activité'/>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <ScrollView style={styles.containInput}>
        <TextInput
            style={styles.input}
            placeholder="Nom de l'activité"
            value={label}
            onChangeText={setLabel}
        />
        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description de l'activité"
            value={description}
            onChangeText={setDescription}
            multiline
        />
        <DropDownPicker
            open={open}
            value={image_default}
            items={items}
            setOpen={setOpen}
            setValue={setImage}
            setItems={setItems}
            placeholder="Sélectionnez un logo"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={1000} // Priorité pour éviter des conflits
            listMode="SCROLLVIEW"
        />
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmer</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#510D0A',
  },
  containInput: {
    marginTop: 80
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    zIndex: 10,
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    zIndex: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: '#386641',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
