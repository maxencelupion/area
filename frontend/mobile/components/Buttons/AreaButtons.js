import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AreaButtons = ({onPress, text, icon, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.areaButtonContainer} activeOpacity={0.7}>
      <View style={styles.areaButton}>
        {icon}
        <Text style={[styles.areaButtonText, {color: color}]}>{text}</Text>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  areaButtonContainer: {
    marginTop: 10,
    width: "90%",
    padding: 10,
    backgroundColor: "#233442",
    borderRadius: 10,
  },
  areaButton: {
    width: "60%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  areaButtonText: {
    fontWeight: "bold",
  }
});

export default AreaButtons;