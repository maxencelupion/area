import {getServiceColor, getServiceIcon} from "../Utils/GetServicesData";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import getImageSource from "../../assets/imagesImport";
import {isServiceConnectedRequest} from "../Request/MobileConnectedRequest";
import {LinearGradient} from "expo-linear-gradient";

const CreateElementCard = ({item, setSelected, setModalDisplay, setServiceNotConnected, setShowAlert, services}) => {

  const selectElement = (item) => {
    isServiceConnectedRequest(item.serviceId)
      .then(response => {
        const isConnected = response.data;
        if (isConnected && isConnected.status === true) {
          setSelected(item);
          setModalDisplay(false);
        } else {
          setServiceNotConnected(item.serviceId)
          setShowAlert(true);
        }
      })
      .catch(error => {
        console.error('Error fetching service status: ', error);
      });
  };

  const getService = (id) => {
    const service = services.find(elem => elem.id === id);
    return service.front_data;
  }

  return (
      <TouchableOpacity onPress={() => selectElement(item)} activeOpacity={0.7} style={styles.modalItemContainer}>
        <LinearGradient
          colors={[getServiceColor(getService(item.serviceId)), '#011627']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1.2}}
          style={styles.gradientStyle} >
          <Image source={getImageSource(getServiceIcon(getService(item.serviceId)))} style={styles.elementIcon} alt={""}/>
          <Text style={styles.modalItem}>{item.description}</Text>
        </LinearGradient>

      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  modalItemContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  modalItem: {
    fontSize: 18,
    width:"80%",
    color: "white",
  },
  elementIcon: {
    width: 30,
    height: 30,
  },
  gradientStyle: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CreateElementCard;