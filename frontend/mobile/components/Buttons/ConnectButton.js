import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Titles from "../Titles";

const ConnectButton = ({icon, text, color, textColor, onPress}) => {
  return (
    <TouchableOpacity style={[styles.connectButton, {borderColor: color}]} activeOpacity={0.7} onPress={onPress}>
      {icon}
      <Titles _title={text} _color={textColor} _size={20}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
  connectButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    backgroundColor: "#011627",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 2,
  }
});

export default ConnectButton;