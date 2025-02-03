import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileCards = ({ _text, _icon, _style, _onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.profileCardContainer, _style]}
      activeOpacity={0.7}
      onPress={_onPress}
    >
      <Text style={styles.profileCardText}>{_text}</Text>
      {_icon && <View style={styles.iconContainer}>{_icon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileCardContainer: {
    width: "90%",
    backgroundColor: "rgba(31, 59, 87, 1)",
    alignSelf: "center",
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },

  profileCardText: {
    color: "white",
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
  },

  iconContainer: {
    marginLeft: 10,
  },
});
export default ProfileCards