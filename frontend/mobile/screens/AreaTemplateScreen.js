import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Image} from "expo-image";
import getImageSource from "../assets/imagesImport";
import { Ionicons } from 'react-native-vector-icons';
import {getServiceColor, getServiceIcon} from "../components/Utils/GetServicesData";
import {LinearGradient} from "expo-linear-gradient";
import ConnectButton from "../components/Buttons/ConnectButton";
import { format } from 'date-fns';
import ElementsCard from "../components/Elements/ElementsCard";
import {PutChangeAreaStatus} from "../components/Request/MobileRequestPut";
import AlertDelete from "../components/Alerts/AlertDelete";

const AreaTemplateScreen = ({ route, navigation }) => {
  const {area, title} = route.params;
  const [statusArea, setStatusArea] = useState(area.active)
  const [alertDelete, setAlertDelete] = useState(false)
  const formattedDate = format(new Date(area.last_executed), "dd MMMM yyyy, HH:mm");

  useEffect(() => {
    navigation.setOptions({
      title,
      headerStyle: {
        backgroundColor: area.color,
      },
      headerTintColor: '#fff',
    });
  }, [navigation, title]);

  const changeAreaStatus = () => {
    PutChangeAreaStatus(area.id)
      .then(() => {
        setStatusArea(!statusArea)
      })
      .catch(error => {
        console.error('Failed to delete area:', error);
      });
  }

  return (
    <>
    <ScrollView style={styles.areaTContainer}>
      <LinearGradient
        colors={[area.color, '#011627']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.areaTGradient}
      >
        <View style={styles.areaTIcons}>
          <View style={styles.templateIcons}>
            <Image source={getImageSource(getServiceIcon(area.action.service.front_data))} style={styles.templateIcon} alt={""}/>
            <Image source={getImageSource(getServiceIcon(area.areaReaction[0].element.service.front_data))} style={styles.templateIcon} alt={""}/>
          </View>

        </View>
        <Text style={styles.areaTLastExec}>Last execution : {formattedDate}</Text>
        <Text style={styles.areaTDescription}>{area.description}</Text>
        <View style={styles.areaTConnectButton}>
          {statusArea === true ? <ConnectButton text={"Active"} color={"green"} icon={<Ionicons name="checkmark-circle-outline" size={40} color="green" />} textColor={"green"} onPress={changeAreaStatus}/> :
            <ConnectButton text={"Not active"} color={"#FF0054"} icon={<Ionicons name="close-circle-outline" size={40} color="#FF0054" />} textColor={"#FF0054"} onPress={changeAreaStatus}/>}
          <ConnectButton text={"Delete"} color={"#FF0054"} icon={ <Ionicons name="trash-outline" size={40} color="#FF0054" />} textColor={"#FF0054"} onPress={() => setAlertDelete(true)}/>
        </View>
      </LinearGradient>

      <View style={styles.areaTCards}>
        <ElementsCard name={area.action.name} description={area.action.description} icon={<Ionicons name="cube-outline" size={40} color="white" />} color={getServiceColor(area.action.service.front_data)}/>
        {area.areaReaction && area.areaReaction.map((card, index) => (
          <ElementsCard key={index} name={card.element.name} description={card.element.description} icon={<Ionicons name="duplicate-outline" size={40} color="white" />} color={getServiceColor(card.element.service.front_data)}/>
        ))}
      </View>
    </ScrollView>
    {alertDelete && <AlertDelete id={area.id} setAlert={setAlertDelete} navigation={navigation} />}
    </>
  );
};

const styles = StyleSheet.create({
  areaTContainer: {
    flex: 1,
    backgroundColor: "#011627",
    elevation: 0,
  },
  areaTGradient: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
    height: 400,
    padding: 20,
  },
  areaTIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },

  templateIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    marginBottom: 20,
  },
  templateIcon: {
    width: 40,
    height: 40,
  },
  areaTDescription: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    marginBottom: 20,
  },
  areaTLastExec: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  areaTConnectButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
  },
  areaTCards: {
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});

export default AreaTemplateScreen;