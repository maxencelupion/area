import {Modal, StyleSheet, TextInput, View} from "react-native";
import Titles from "../Titles";
import AlertButton from "../Buttons/AlertButton";
import React, { useState, cloneElement} from "react";
import AlertArgument from "../Alerts/AlertArgument";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChangeModal = ({_title, _icon, setModalVisible, isModalVisible, _content, setUserInfos, setChangeData, isPassword = false}) => {
  const [inputContent, setInputContent] = useState("");
  const [alertWrongArgument, setAlertWrongArgument] = useState({status: false})

  const modifiedIcon = cloneElement(_icon, {
    size: 25,
    color: "#011627"
  });

  const onClose = () => {
    setChangeData(true);
    setInputContent("")
    setModalVisible(false);
  }

  const handleSave = () => {
    if (inputContent.length === 0) {
      setAlertWrongArgument({
        status: true,
        text: `You must enter a valid ${_title.toLowerCase()}`,
        icon: <Ionicons name="close-circle-outline" size={30} color="#FF0054"/>});
    } else {
      const newLabel = _title.toLowerCase();
      setUserInfos(prevUserInfos => ({
        ...prevUserInfos,
        [newLabel]: inputContent
      }));
      setAlertWrongArgument({
        status: true,
        text: `Successfully change your ${newLabel}`,
        icon: <Ionicons name="checkmark-circle-outline" size={30} color="green"/>
      });
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
        setInputContent("");
      } }
    >
      <View style={styles.changeOverlay}>
        <View style={styles.changeContainer}>
          <View style={styles.changeHeader}>
            <Titles _title={`Change your ${_title}`} _size={18} _color={"#011627"}/>
            {modifiedIcon}
          </View>
          <TextInput
            secureTextEntry={isPassword}
            style={styles.changeInput}
            placeholder={`Enter new ${_title.toLowerCase()}`}
            value={inputContent}
            onChangeText={setInputContent}
            placeholderTextColor="#011627"
          />
          <View style={styles.changeButtonContainer}>
            <AlertButton onPress={handleSave} color={"#FF0054"} content={"Save changes"}/>
            <AlertButton onPress={() => {
              setModalVisible(false);
              setInputContent("");
            }} color={"#011627"} content={"Close"}/>
          </View>

        </View>
        {alertWrongArgument.status && <AlertArgument setAlertWrongArgument={setAlertWrongArgument} icon={alertWrongArgument.icon} text={alertWrongArgument.text} onClose={onClose} />}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  changeOverlay: {
    flex: 1,
    backgroundColor: "rgba(1, 22, 39, 0.5)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    margin: "auto",
    padding: 25,
    borderRadius: 10,
  },
  changeHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  changeInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#011627",
    fontWeight: "bold",
    borderWidth: 1,
  },
  changeButtonContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ChangeModal;