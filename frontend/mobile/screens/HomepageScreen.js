import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderContent from "../components/HeaderContent";
import PredefinedAreasCard from "../components/AreasComponents/PredefinedAreasCard";
import Titles from "../components/Titles";
import { useNavigation } from '@react-navigation/native';
import {servicesRequest, actionsRequest, reactionsRequest} from "../components/Request/MobileRequestGet";
import {PredefinedAreasInfos} from "../components/AreasComponents/PredefinedAreaInfos";

import { Ionicons } from 'react-native-vector-icons';
import {profileInfosRequest} from "../components/Request/MobileConnectedRequest";

const HomeScreen = () => {

  const navigation = useNavigation();
  const [actions, setActions] = useState([])
  const [reactions, setReactions] = useState([])
  const [services, setServices] = useState([])
  const [areasCard, setAreasCard] = useState([])
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    servicesRequest().then(response => {setServices(response.data)}).catch(error => {console.error('Error: ', error);});
    profileInfosRequest().then(response => {setUserInfos(response.data)}).catch(error => {console.error('Error: ', error);});
    reactionsRequest().then(response => {setReactions(response.data)}).catch(error => {console.error('Error: ', error);});
    actionsRequest().then(response => {setActions(response.data)}).catch(error => {console.error('Error: ', error);});
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const predefinedCards = PredefinedAreasInfos(services, actions, reactions, 200, 250, 4);
      setAreasCard(predefinedCards);
    }
  }, [services, actions, reactions]);

  if (!services || !actions || !reactions || !userInfos) {
    return <ActivityIndicator size="large" color="#FF0054" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.homeContainer}>
      {userInfos && <HeaderContent title={`Welcome ${userInfos.surname}!`} text={"Access your Area page to manage all your areas and create new ones!"} style={styles.headerHome}/>}
      <TouchableOpacity
        style={styles.accessAreasButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('MyArea')}
      >
        <Titles _title={"Access my Areas"} _color={"white"} _size={20} _style={styles.buttonTitle}/>
        <Ionicons name="layers-outline" size={25} color="#ffffff" style={{ marginRight: 15 }} />
      </TouchableOpacity>

      <Text style={styles.homepageText}>Here are some predefined Areas to help you...</Text>
      {areasCard.map((card, index) => (
        <PredefinedAreasCard
          key={index}
          _width={card._width}
          _height={card._height}
          _color={card._color}
          _title={card._service}
          _action={card._action}
          _reaction={card._reaction}
          _reactionIcon={card._reactionIcon}
          _actionIcon={card._actionIcon}
          _actionId={card._actionId}
          _reactionId={card._reactionId}
          _style={styles.card}
          _navigate={'MyArea'}
        />
      ))}

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#011627',
    width: "100%",
  },
  accessAreasButton: {
    width: "80%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FF0054",
    padding: 15,
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 20,
  },
  buttonTitle: {
    marginLeft: 10,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  headerHome: {
    marginBottom: 20,
  },
  homepageText: {
    color: "white",
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 15,
  },
});

export default HomeScreen;