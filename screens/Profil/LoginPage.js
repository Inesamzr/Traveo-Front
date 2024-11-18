import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import texts from '../../localization/localization';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const [language, setLanguage] = useState('fr'); 

  const currentTexts = texts[language]; 
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/Login_asset.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      ></ImageBackground>

      <Image 
          source={require('../../assets/Login_asset_2.png')} 
          style={styles.bottomLeftImage}
        />

      <View style={styles.contenu}>
        <Image 
            source={require('../../assets/Traveo_logo.png')} 
            style={styles.logo}
        />
        <Text style={styles.welcomeText}>{currentTexts.welcome}</Text>
        <Text style={styles.connectText}>{currentTexts.connect}</Text>
        <View style={styles.inputContainer}>
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
        </View>
        <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{currentTexts.login}</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
            <Text style={styles.noAccountText}>{currentTexts.noAccount}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>{currentTexts.register}</Text>
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
    height: '70%', 
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex:0
  },
  contenu:{
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    zindex:2,
    marginTop:-400
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
    color: '#386641',
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
  loginButton: {
    backgroundColor: '#D9A5B3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 14,
    color: '#111',
  },
  registerText: {
    fontSize: 14,
    color: '#510D0A',
    fontWeight: 'bold',
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: '20%',
  }, 
});
