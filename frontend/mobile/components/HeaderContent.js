import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderContent = ({ title, text, style }) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0054',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default HeaderContent;