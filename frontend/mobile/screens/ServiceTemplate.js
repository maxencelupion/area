import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Image} from "expo-image";
import getImageSource from "../assets/imagesImport";
import Titles from "../components/Titles";
import {isServiceConnectedRequest} from "../components/Request/MobileConnectedRequest";
import {elementsFromService} from "../components/Request/MobileRequestGet";
import ConnectButton from "../components/Buttons/ConnectButton";
import { Ionicons } from 'react-native-vector-icons';
import ElementsCard from "../components/Elements/ElementsCard";
import {capitalizeFirstLetter} from "../components/Utils/Utils";
import { Linking } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IP} from "../components/Request/MobileEnvData";
import DeleteServiceById from "../components/Request/MobileDeleteService";
import AlertArgument from "../components/Alerts/AlertArgument";

const ServiceTemplateScreen = ({ route, navigation }) => {
  let {id, color, icon, title, description } = route.params;
  const [isConnected, setIsConnected] = useState(null)
  const [elements, setElements] = useState([])
  title = capitalizeFirstLetter(title);
  const elementsTab = ["Actions", "Reactions"];
  const [activeSearch, setActiveSearch] = useState('Actions');
  const [refreshing, setRefreshing] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    text: "You have successfully removed this area !",
    icon: <Ionicons name="checkmark-circle-outline" size={30} color="green" style={styles.argumentsButton} />
  });

  const reloadService = async () => {
    elementsFromService(id).then(response => {
      setElements(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });

    isServiceConnectedRequest(id).then(response => {
      setIsConnected(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  useEffect(() => {
    reloadService();

    navigation.setOptions({
      title,
      headerStyle: {
        backgroundColor: color,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    });
  }, [navigation, title]);

  const handleSignOut = () => {
    DeleteServiceById(id);
    setAlert({
      status: true,
      text: "You have successfully removed this service !",
      icon: <Ionicons name="checkmark-circle-outline" size={30} color="green" style={styles.argumentsButton} />
    });
  }

  const handleSignIn = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const googleAuthUrl = `${IP}/auth/${title.toLowerCase()}/callback?state=area://Tabs|${token}`;
    Linking.openURL(googleAuthUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reloadService().then(() => {
      setRefreshing(false);
    }).catch((error) => {
      console.error('Error refreshing areas:', error);
      setRefreshing(false);
    });
  }, [reloadService]);

  return (
    <ScrollView
      style={styles.serviceTContainer}
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="#FF0054"
        colors={["#FF0054"]}
        progressBackgroundColor="#011627" />}
    >
      <LinearGradient
        colors={[color, '#011627']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.serviceTGradient}
      >
        <View style={styles.serviceTHeader}>
          <Image source={getImageSource(icon)} style={styles.serviceTIcon} alt={""}/>
          <Titles _title={description} _color={"white"} _style={styles.serviceTDesc}/>
          {isConnected && isConnected.status === true ? <ConnectButton color={color} icon={<Ionicons name="checkmark-circle-outline" size={40} color="green" />} text={"Connected"} textColor={"green"} onPress={handleSignOut}/> :
            <ConnectButton color={color} icon={<Ionicons name="close-circle-outline" size={40} color="#FF0054" />} text={"Not connected"} textColor={"#FF0054"} onPress={handleSignIn}/>}
        </View>
      </LinearGradient>
      <View style={styles.elementsTabContainer}>
        {elementsTab.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveSearch(tab)}
            style={[styles.elementsTabBlock]}
            activeOpacity={0.7}
          >
            <View style={styles.elementsTabStyle}>
              {tab === "Actions" ? <Ionicons name="cube-outline" size={20} color={activeSearch === "Actions" ? "#FF0054" : "white"} /> : <Ionicons name="duplicate-outline" size={20} color={activeSearch === "Reactions" ? "#FF0054" : "white"} />}
              <Text style={[styles.elementsTabText, activeSearch === tab && styles.elementsTabActive]}>{tab}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.elementsContainer}>
        {activeSearch === "Actions" && elements.actions && elements.actions.map((element, index) => (
          <ElementsCard
            key={index}
            name={element.name}
            description={element.description}
            icon={<Ionicons name="cube-outline" size={40} color="white" />}
            color={color}
          />
        ))}
        {activeSearch === "Reactions" && elements.reactions && elements.reactions.map((element, index) => (
          <ElementsCard
            key={index}
            name={element.name}
            description={element.description}
            icon={<Ionicons name="duplicate-outline" size={40} color="white" />}
            color={color}
          />
        ))}
      </View>
      {alert.status && <AlertArgument setAlertWrongArgument={setAlert} text={alert.text} icon={alert.icon} onClose={reloadService}/>}
    </ScrollView>
  );

};

const styles = StyleSheet.create ({
  serviceTContainer: {
    flex: 1,
    backgroundColor: "#011627",
    elevation: 0,
  },
  serviceTGradient: {
    width: "100%",
    height: 400,
  },
  serviceTHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 50,
    padding: 20,
  },
  serviceTIcon: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  serviceTDesc: {
    alignSelf: "center",
    textAlign: "center",
  },
  elementsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  elementsTabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
  elementsTabBlock: {
    alignSelf: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  elementsTabStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  elementsTabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  elementsTabActive: {
    color: "#FF0054",
  }
});

export default ServiceTemplateScreen;