import {StyleSheet, TextInput, View} from "react-native";
import React from "react";
import { Ionicons } from 'react-native-vector-icons';

const SearchBarComponent = ({handleSearch, searchInput}) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={20} color="white" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for services..."
        placeholderTextColor="#999"
        value={searchInput}
        onChangeText={handleSearch}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'rgba(31, 59, 87, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    color: "white"
  },
});

export default SearchBarComponent