import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../Components/Header';
import { logoOptions } from '../../Utils/logoOptions';
import { updateTheme, deleteTheme } from '../../services/themeService';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


export default function EditThemePage({ route, navigation }) {
  const { theme } = route.params;

  const [label, setLabel] = useState(theme.label);
  const [description, setDescription] = useState(theme.description);
  const [image_default, setImage] = useState(theme.image_default);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(logoOptions);

  const handleUpdate = async () => {
    if (!label || !description || !image_default) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    await updateTheme(theme.idTheme, { label, description, image_default });
    Alert.alert('Succès', 'Thème mis à jour avec succès');
    navigation.goBack();
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce thème ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteTheme(theme.idTheme);
            Alert.alert('Succès', 'Thème supprimé avec succès');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Modifier un thème" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <ScrollView style={styles.containInput}>
        <TextInput
            style={styles.input}
            placeholder="Nom du thème"
            value={label}
            onChangeText={setLabel}
        />
        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description du thème"
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
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
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
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#386641',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#BC4749',
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
