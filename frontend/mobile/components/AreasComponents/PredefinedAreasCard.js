import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import getImageSource from "../../assets/imagesImport";
import {useNavigation} from "@react-navigation/native";
import { RFValue } from 'react-native-responsive-fontsize';

const PredefinedAreasCard = ({_width, _height, _title, _reactionIcon, _actionIcon, _color, _style, _action, _reaction, _navigate, _actionId, _reactionId}) => {
  const navigation = useNavigation();

  const handlePress = () => {
      navigation.navigate(_navigate, {
        redirect: true,
      });
  };

  return (
    <TouchableOpacity
      style={[styles.cardStyle, { height: _height}, _style]}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <LinearGradient
        colors={[_color, '#011627']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradientStyle}
      >
        <View style={styles.areaHeaderContainer}>
          <View style={styles.areaIcons}>
            <Image source={getImageSource(_actionIcon)} style={styles.areaIcon} alt={""}/>
            <Image source={getImageSource(_reactionIcon)} style={styles.areaIcon} alt={""}/>
          </View>
          <Text style={styles.areaTitle}>{_title}</Text>
        </View>

        <View style={styles.areaTextContainer}>
          <View style={styles.areaTextContent}>
            <Text style={styles.areaIfThen}>If</Text>
            <Text style={styles.areaActionsContent}>{_action}</Text>
          </View>
          <View style={styles.areaTextContent}>
            <Text style={styles.areaIfThen}>Then</Text>
            <Text style={styles.areaActionsContent}>{_reaction}</Text>
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
    overflow: "hidden",
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
    fontSize: RFValue(15),
    width: "70%",
    textAlign: "right"
  },
  areaText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "80%"
  },
  areaTextContainer: {
    width: "100%",
    height: "50%",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  areaTextContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  areaIfThen: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  areaActionsContent: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    width: "90%",
    alignSelf: "center",
  }
});


export default PredefinedAreasCard