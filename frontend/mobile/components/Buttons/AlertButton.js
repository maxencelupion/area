import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

const AlertButton = ({onPress, content, color, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.alertButton, {backgroundColor: color}, style]} activeOpacity={0.7}>
      <Text style={styles.alertButtonText}>{content}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  alertButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  alertButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
export default AlertButton;