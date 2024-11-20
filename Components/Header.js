// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }) {
  return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#510D0A', 
    alignSelf: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 15,
    paddingTop: 40,
    paddingHorizontal: 27,
    position:'absolute',
    top: 0,
    zIndex: 2,
  },
  headerText: {
    color: '#FFF', 
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
