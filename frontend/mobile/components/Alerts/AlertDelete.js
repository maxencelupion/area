import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DeleteAreaById from "../Request/MobileDeleteRequest";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AlertButton from "../Buttons/AlertButton";

const AlertDelete = ({setAlert, id, navigation}) => {

  const deleteArea = () => {
    DeleteAreaById(id)
      .then(() => {
        setAlert(false);
        navigation.navigate('MyArea')
      })
      .catch(error => {
        console.error('Failed to delete area:', error);
      });
  }

  return (
    <Modal
      transparent={true}
      onRequestClose={() => setAlert(false)}
      animationType="fade"
    >
      <View style={styles.alertDeleteOverlay}>
        <View style={styles.alertDeleteContainer}>
          <Ionicons name="help-circle-outline" size={40} color="#011627"/>
          <Text style={styles.alertDeleteTitle}>Are you sure you want to delete this Area ?</Text>
          <View style={styles.alertDeleteButtons}>
            <AlertButton color={"#FF0054"} onPress={deleteArea} content={"Continue"} />
            <AlertButton color={"#011627"} onPress={() => setAlert(false)} content={"Close"} />
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  alertDeleteOverlay: {
    flex: 1,
    backgroundColor: "rgba(1, 22, 39, 0.5)"
  },
  alertDeleteContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    alignSelf: "center",
    margin: "auto",
    padding: 25,
    borderRadius: 10,
  },
  alertDeleteButtons: {
    alignSelf: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  alertDeleteTitle: {
    color: "#011627",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  }
});
export default AlertDelete;