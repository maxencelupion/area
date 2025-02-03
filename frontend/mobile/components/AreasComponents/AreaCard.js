import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import getImageSource from "../../assets/imagesImport";
import {useNavigation} from "@react-navigation/native";
import {getServiceIcon} from "../Utils/GetServicesData";
import { Ionicons } from 'react-native-vector-icons';

const AreaCard = ({area}) => {
  const navigation = useNavigation();

  const handlePress = () => {
      navigation.navigate("AreaTemplate", {
        area: area,
        title: area.name,
      });
  };

  if (!area) {
    return <ActivityIndicator size="large" color="#FF0054" />;
  }

  return (
    <TouchableOpacity
      style={[styles.cardStyle, { height: 350}]}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <LinearGradient
        colors={[area.color, '#011627']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradientStyle}
      >
        <View style={styles.areaHeaderContainer}>
          <View style={styles.areaIcons}>
            <Image source={getImageSource(getServiceIcon(area.action.service.front_data))} style={styles.areaIcon} alt={""}/>
            <Image source={getImageSource(getServiceIcon(area.areaReaction[0].element.service.front_data))} style={styles.areaIcon} alt={""}/>
          </View>
          <Text style={styles.areaTitle}>{area.name}</Text>
        </View>

        <View style={styles.areaTextContainer}>
            <Text style={styles.areaText}>{area.description}</Text>
        </View>
        <View style={styles.numberElementsContainer}>
          <View style={styles.numberElementsContent}>
            <Ionicons name="cube-outline" size={25} color="white" />
            <Text style={styles.numberElementsText}>Number of actions: 1</Text>
          </View>
          <View style={styles.numberElementsContent}>
            <Ionicons name="duplicate-outline" size={25} color="white" />
            <Text style={styles.numberElementsText}>Number of reactions: {area.areaReaction.length}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: '90%',
    flex: 1,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    position: "relative",
    marginBottom: 30,
  },
  gradientStyle: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  areaIcon: {
    width: 25,
    height: 25,
  },
  areaHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  areaIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  areaTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  areaTextContainer: {
    width: "90%",
    gap: 20,
  },
  areaText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    width: "100%",
    alignSelf: "center",
    textAlign: "left",
  },
  numberElementsContainer: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  numberElementsContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  numberElementsText: {
    color: "white",
    fontWeight: "bold",
  }
});


export default AreaCard;