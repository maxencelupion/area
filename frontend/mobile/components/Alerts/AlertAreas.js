import {TouchableOpacity, View, StyleSheet, Modal, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {servicesByIdRequest} from "../Request/MobileRequestGet";
import {getServiceColor, getServiceIcon} from "../Utils/GetServicesData";
import AlertButton from "../Buttons/AlertButton";

const AlertAreas = ({showAlert, setShowAlert, selectedService, setModalDisplay}) => {

  const navigation = useNavigation();

  const connectService = () => {
    servicesByIdRequest(selectedService).then(response => {
      const service = response.data
      navigation.navigate("ServiceTemplate", {
        id: selectedService,
        color: getServiceColor(service.front_data),
        icon: getServiceIcon(service.front_data),
        title: service.name,
        description: service.description,
      });
      setShowAlert(false);
      setModalDisplay(false);
    }).catch(error => {
      console.error('Error: ', error);
    });

  };

  return (
    <Modal
      transparent={true}
      visible={showAlert}
      onRequestClose={() => setShowAlert(false)}
      animationType="fade"
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>Service Connection Required</Text>
          <Text style={styles.alertText}>You need to connect to this service to use this action or reaction.</Text>
          <View style={styles.alertButtonContainer}>
            <AlertButton color={"#FF0054"} onPress={() => connectService()} content={"Connect to service"} />
            <AlertButton color={"#011627"} onPress={() => setShowAlert(false)} content={"Close"} />
          </View>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(1, 22, 39, 0.5)"
  },
  alertContent: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    margin: "auto",
    padding: 25,
    borderRadius: 10,
  },
  alertTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  alertText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 15,
    marginBottom: 20,
  },
  alertButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%"
  },
});

export default AlertAreas;