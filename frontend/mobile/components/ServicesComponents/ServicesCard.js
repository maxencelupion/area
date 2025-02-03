import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import getImageSource from "../../assets/imagesImport";
import {useNavigation} from "@react-navigation/native";
import {capitalizeFirstLetter} from "../Utils/Utils";

const ServiceCard = ({_color, _height, _width, _icon, _title, _style, _id, _description}) => {
  const navigation = useNavigation();

  const handlePressService = () => {

      navigation.navigate("ServiceTemplate", {
        id: _id,
        color: _color,
        icon: _icon,
        title: _title,
        description: _description,
      });
  };

  return (
    <TouchableOpacity
      style={[styles.serviceCardStyle, { height: _height}, _style]}
      activeOpacity={0.7}
      onPress={handlePressService}
    >
      <LinearGradient
        colors={[_color, '#011627']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientStyle}
      >
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceCardText}>Service</Text>
          <Image source={getImageSource(_icon)} style={styles.serviceCardIcon} alt={""}/>
          <Text style={styles.serviceCardTitle}>{capitalizeFirstLetter(_title)}</Text>
        </View>

      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceCardStyle: {
    width: '90%',
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  gradientStyle: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  serviceCardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceContainer: {
    display: "flex",
    flexDirection: "column",
  },
  serviceCardIcon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  serviceCardTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
});


export default ServiceCard