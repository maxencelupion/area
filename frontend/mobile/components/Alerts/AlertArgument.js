import {View, StyleSheet, Modal, Text} from "react-native";
import AlertButton from "../Buttons/AlertButton";

const AlertArgument = ({setAlertWrongArgument, text, icon, onClose}) => {

  const closeWrongArguments = () => {
    setAlertWrongArgument({status: false});
    if (onClose) {
      onClose();
    }
  }

  return (
    <Modal
      transparent={true}
      onRequestClose={() => setAlertWrongArgument(false)}
      animationType="fade"
    >
      <View style={styles.wrongOverlay}>
        <View style={styles.wrongContent}>
          <View style={styles.wrongIcon}>{icon}</View>
          <Text style={styles.wrongTitle}>{text}</Text>
          <AlertButton color={"#FF0054"} onPress={() => closeWrongArguments()} content={"Continue"} style={styles.wrongButton}/>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  wrongOverlay: {
    flex: 1,
    backgroundColor: "rgba(1, 22, 39, 0.5)"
  },
  wrongContent: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    margin: "auto",
    padding: 25,
    borderRadius: 10,
  },
  wrongTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  wrongButton: {
    alignSelf: "center",
  },
  wrongIcon: {
    alignSelf: "center",
  }
});
export default AlertArgument;