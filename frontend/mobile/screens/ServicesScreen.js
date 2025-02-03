import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import SearchBarComponent from "../components/ServicesComponents/SearchBarComponent";
import ServicesCardsScroll from "../components/ServicesComponents/ServicesCardsScroll";

import {servicesRequest, actionsRequest, reactionsRequest} from "../components/Request/MobileRequestGet";
import {PredefinedAreasInfos} from "../components/AreasComponents/PredefinedAreaInfos";

const ServicesScreen = () => {
  const [activeSearch, setActiveSearch] = useState('All');
  const [searchInput, setSearchInput] = useState("");
  const servicesTab = ["All", "Services", "Areas"];

  const [actions, setActions] = useState([])
  const [reactions, setReactions] = useState([])
  const [services, setServices] = useState([])
  const [areasCard, setAreasCard] = useState([])

  useEffect(() => {
    servicesRequest().then(response => {
      setServices(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
    actionsRequest().then(response => {
      setActions(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
    reactionsRequest().then(response => {
      setReactions(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const predefinedCards = PredefinedAreasInfos(services, actions, reactions, 200, 250, 4);
      setAreasCard(predefinedCards);
    }
  }, [services, actions, reactions]);
  const handleSearch = (query) => {
    setSearchInput(query);
  };

  const filteredServicesCards = services.filter(service =>
    service.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const filteredActionsCards = areasCard.filter(action =>
    action._service.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.serviceTabContainer}>
        {servicesTab.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveSearch(tab)}
            style={[styles.serviceTabBlock]}
            activeOpacity={0.7}
          >
            <Text style={[styles.serviceTabStyle, activeSearch === tab && styles.serviceTabActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <SearchBarComponent handleSearch={handleSearch} searchInput={searchInput} />
      <ServicesCardsScroll filteredServicesCards={filteredServicesCards} filteredActionsCards={filteredActionsCards} activeSearch={activeSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011627',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 20,
  },
  serviceTabContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 30,
  },
  serviceTabBlock: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },

  serviceTabStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  serviceTabActive: {
    color: '#FF0054',
  },
});

export default ServicesScreen;