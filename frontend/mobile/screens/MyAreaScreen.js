import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DisplayAreas from "../components/AreasComponents/DisplayAreas";
import CreateAreas from "../components/AreasComponents/CreateAreas";
import {connectedAreasRequest} from "../components/Request/MobileConnectedRequest";


const MyAreaScreen = ({ route }) => {
  const createArea = "Create Area";
  const displayArea = "Your Areas";
  const {redirect} = (route.params ? route.params : false)
  const [areasPage, setAreaPage] = useState((redirect ? createArea : displayArea))
  const [areasConnected, setAreasConnected] = useState(null);

  const reloadAreas = async () => {
    connectedAreasRequest()
      .then(response => {
        setAreasConnected(response.data);
      })
      .catch(error => {
        console.error('Error fetching actions: ', error);
      });
  };

  useEffect(() => {
    reloadAreas()
  }, []);

  return (
    <View style={styles.profileServicesContainer}>
      <View style={styles.areasHeader}>
        <TouchableOpacity onPress={() => setAreaPage(displayArea)} activeOpacity={0.7}>
          <Text style={[styles.areasHeaderTitle, areasPage === displayArea ? styles.areasHeaderTitleActive : '']}>{displayArea}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAreaPage(createArea)} activeOpacity={0.7}>
          <Text style={[styles.areasHeaderTitle, areasPage === createArea ? styles.areasHeaderTitleActive : '']}>{createArea}</Text>
        </TouchableOpacity>
      </View>

      {areasConnected && areasPage === "Your Areas" && <DisplayAreas userAreas={areasConnected} reloadAreas={reloadAreas}/>}
      {areasPage === "Create Area" && <CreateAreas setAreaPage={setAreaPage}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  profileServicesContainer: {
    flex: 1,
    backgroundColor: '#011627',
  },
  areasHeader: {
    alignSelf: "center",
    display: "flex",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  areasHeaderTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  areasHeaderTitleActive: {
    color: "#FF0054",
  },
})

export default MyAreaScreen;