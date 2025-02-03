import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SearchBarComponent from "../components/ServicesComponents/SearchBarComponent";
import FilterCards from "../components/ProfileComponents/FilterCards";
import {servicesRequest} from "../components/Request/MobileRequestGet";
import {connectedAreasRequest, servicesConnectedRequest} from "../components/Request/MobileConnectedRequest";

const ProfileServicesScreen = () => {
  const servicesTab = ["Connected", "Disconnected"];
  const [activeSearch, setActiveSearch] = useState('Connected');
  const [searchInput, setSearchInput] = useState("");
  const [services, setServices] = useState([])
  const [disconnectedServices, setDisconnectedServices] = useState([])
  const [connectedServices, setConnectedServices] = useState([])

  const reloadServices = async () => {
    servicesRequest().then(response => {
      setServices(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
    servicesConnectedRequest().then(response => {
      setConnectedServices(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  useEffect(() => {
    reloadServices()
  }, []);

  useEffect(() => {
    setDisconnectedServices(services.filter(service =>
      !connectedServices.some(connectedService => connectedService.id === service.id)
    ));
  }, [connectedServices, services]);

  const filteredConnected = connectedServices.filter(service =>
    service.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const filteredDisconnected = disconnectedServices.filter(service =>
    service.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchInput(query);
  };

  return (
    <View style={styles.profileServicesContainer}>
      <View style={styles.profileTabContainer}>
        {servicesTab.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveSearch(tab)}
            activeOpacity={0.7}
          >

            <Text style={[styles.profileTabStyle, activeSearch === tab && styles.profileTabActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <SearchBarComponent handleSearch={handleSearch} searchInput={searchInput} />
      {activeSearch === "Connected" && <FilterCards filteredCards={filteredConnected} type={"Services"} reloadServices={reloadServices}/>}
      {activeSearch === "Disconnected" && <FilterCards filteredCards={filteredDisconnected} type={"Services"} reloadServices={reloadServices}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  profileServicesContainer: {
    flex: 1,
    backgroundColor: '#011627',
  },
  profileTabContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-around"
  },
  profileTabStyle: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20,
  },
  profileTabActive: {
    color: "#FF0054"
  },
})

export default ProfileServicesScreen;