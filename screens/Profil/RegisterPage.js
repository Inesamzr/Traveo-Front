import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import texts from '../../localization/localization';

export default function RegisterPage({ navigation }) {
  const [language, setLanguage] = useState('fr');

  const currentTexts = texts[language];

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/Login_asset.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Image 
          source={require('../../assets/Traveo_logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>{currentTexts.welcome}</Text>
        <Text style={styles.connectText}>{currentTexts.registerTitle}</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder={currentTexts.firstNamePlaceholder} 
            placeholderTextColor="#aaa" 
          />
          <TextInput 
            style={styles.input} 
            placeholder={currentTexts.lastNamePlaceholder} 
            placeholderTextColor="#aaa" 
          />
          <TextInput 
            style={styles.input} 
            placeholder={currentTexts.emailPlaceholder} 
            placeholderTextColor="#aaa" 
          />
          <TextInput 
            style={styles.input} 
            placeholder={currentTexts.passwordPlaceholder} 
            placeholderTextColor="#aaa" 
            secureTextEntry 
          />
          <TextInput 
            style={styles.input} 
            placeholder={currentTexts.confirmPasswordPlaceholder} 
            placeholderTextColor="#aaa" 
            secureTextEntry 
          />
        </View>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>{currentTexts.register}</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.alreadyAccountText}>{currentTexts.alreadyAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Navbar', {screen:'Profil',params: { screen: 'Register' }})}>
            <Text style={styles.loginText}>{currentTexts.login}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  backgroundImage: {
    width: '100%',
    height: '40%', 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -100, 
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#111',
    fontWeight: '300',
    textAlign: 'center',
  },
  connectText: {
    fontSize: 24,
    color: '#008900',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#D9A5B3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    width: '100%',
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontSize: 14,
    color: '#111',
  },
  loginText: {
    fontSize: 14,
    color: '#510D0A',
    fontWeight: 'bold',
  },
});
