import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../services/userService';

export default function ReviewCard({ id, userId, rating, comment, avatarColor, onEdit, onDelete }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const getAuthName = async () => {
      const user = await getUserById(userId);
      setAuthorName(user.username);
      console.log(authorName);
    }

    const checkUser = async () => {
      
      const loggedInUserId = await AsyncStorage.getItem("userId");
      setIsAuthor(loggedInUserId === userId);
    };

    getAuthName();
    checkUser();
  }, [userId]);

  return (
    <View style={[styles.container, { backgroundColor: avatarColor }]}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={40} color="#111" />
        <View style={styles.info}>
          <Text style={styles.name}>{authorName}</Text>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < rating ? 'star' : 'star-outline'}
                size={16}
                color="#FFD700"
              />
            ))}
          </View>
        </View>
        {isAuthor && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(id)}>
              <Ionicons name="pencil" size={20} color="#007BFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(id)}>
              <Ionicons name="trash" size={20} color="#FF0000" style={styles.iconSpacing} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  comment: {
    marginTop: 10,
    fontSize: 14,
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginLeft: 10,
  },
});
