import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Titles from "../Titles";

const ElementsCard = ({name, description, icon, color}) => {
  return (
    <LinearGradient
      colors={[color, '#011627']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.1 }}
      style={styles.elementsCardContainer}
    >
      <View style={styles.elementsCardHeader}>
        {icon}
        <Titles _title={name} _color={"white"} _size={15}/>
      </View>
      <Text style={styles.elementsCardDescription}>{description}</Text>

    </LinearGradient>
  );
}

const styles = StyleSheet.create ({
  elementsCardContainer: {
    width: "90%",
    minHeight: 150,
    height: "auto",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    overflow: "hidden",
  },
  elementsCardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  elementsCardDescription: {
    color: "white",
  },
});

export default ElementsCard;