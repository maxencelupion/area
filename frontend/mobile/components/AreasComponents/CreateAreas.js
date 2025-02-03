import {View, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native';
import {useEffect, useState} from "react";
import {actionsRequest, reactionsRequest, servicesRequest} from "../Request/MobileRequestGet";
import Titles from "../Titles";
import PostNewArea from "../Request/MobileRequestPost";
import AlertArgument from "../Alerts/AlertArgument";
import {Ionicons} from 'react-native-vector-icons';
import AreaSelectors from "./AreaSelectors";
import ColorSelector from "./ColorSelector";

const CreateAreas = ({setAreaPage}) => {
  const [actions, setActions] = useState([]);
  const [areaColor, setAreaColor] = useState("#000000");
  const [reactions, setReactions] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedAction, setSelectedAction] = useState([{ description: 'Select an Action' }]);
  const [selectedReactions, setSelectedReactions] = useState([{ description: 'Select a Reaction' }]);
  const [alertArgument, setAlertArgument] = useState({
    status: false,
    text: "",
    icon: null,
  });
  const [areaName, setAreaName] = useState("");
  const [areaDescription, setAreaDescription] = useState("");

  useEffect(() => {
    actionsRequest().then(response => setActions(response.data)).catch(error => console.error('Error fetching actions: ', error));
    reactionsRequest().then(response => setReactions(response.data)).catch(error => console.error('Error fetching reactions: ', error));
    servicesRequest().then(response => setServices(response.data)).catch(error => console.error('Error fetching services: ', error));
  }, []);

  const errorHandling = () => {
    if (areaName.length === 0 || areaDescription.length === 0) {
      setAlertArgument({
        status: true,
        text: "You must specify a name and description for your area.",
        icon: <Ionicons name="close-circle-outline" size={30} color="#FF0054" style={styles.argumentsButton} />
      });
      return true;
    }
    if (!selectedAction[0].id || !selectedReactions[0].id) {
      setAlertArgument({
        status: true,
        text: "You must select at least 1 action and 1 reaction to create an Area",
        icon: <Ionicons name="close-circle-outline" size={30} color="#FF0054" style={styles.argumentsButton} />
      });
      return true;
    }
    if (selectedAction.some(action => !action.id) || selectedReactions.some(reaction => !reaction.id)) {
      setAlertArgument({
        status: true,
        text: "You must define all your actions and reactions to create an Area",
        icon: <Ionicons name="close-circle-outline" size={30} color="#FF0054" style={styles.argumentsButton} />
      });
      return true;
    }
    return false;
  }

  const sendNewArea = () => {
    if (errorHandling())
      return;

    const areaData = {
      name: areaName,
      description: areaDescription,
      parameter: {},
      active: true,
      actionId: selectedAction[0].id,
      reactions: selectedReactions.map((reaction, i) => ({
        elementId: reaction.id,
        order: i + 1,
        parameter_reaction: {}
      })),
      color: areaColor,
    };

    setAlertArgument({
      status: true,
      text: "You successfully created a new Area!",
      icon: <Ionicons name="checkmark-circle-outline" size={30} color="green" style={styles.argumentsButton} />
    });

    return PostNewArea(areaData);
  };

  return (
    <ScrollView>
      <ScrollView style={styles.createAreaContainer}>
        <View style={styles.createAreaInputContainer}>
          <View style={styles.createInputContent}>
            <Titles _title={"Name"} _size={25} />
            <TextInput
              style={styles.createAreaInput}
              placeholder="Enter area name"
              value={areaName}
              onChangeText={setAreaName}
              placeholderTextColor={"#011627"}
              maxLength={15}
            />
          </View>

          <View style={[styles.createInputContent, { marginBottom: 10 }]}>
            <Titles _title={"Description"} _size={25} />
            <TextInput
              style={styles.createAreaInput}
              placeholder="Enter area description"
              value={areaDescription}
              onChangeText={setAreaDescription}
              placeholderTextColor={"#011627"}
              maxLength={90}
            />
          </View>
        </View>
        <AreaSelectors reactions={reactions} actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction} services={services} selectedReactions={selectedReactions} setSelectedReactions={setSelectedReactions} />

        <ColorSelector setColor={setAreaColor} />

        <TouchableOpacity
          style={styles.createAreaButton}
          activeOpacity={0.7}
          onPress={sendNewArea}
        >
          <Titles _title={"Create Area"} _color={"white"} />
        </TouchableOpacity>
      </ScrollView>
      {alertArgument.status && <AlertArgument setAlertWrongArgument={setAlertArgument} text={alertArgument.text} icon={alertArgument.icon} onClose={() => setAreaPage("Your Areas")}/>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  createAreaContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  createAreaButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#FF0054",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: "80%"
  },

  argumentsButton: {
    alignSelf: "center",
    marginBottom: 10,
  },
  createInputContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignSelf: "center",
    width: "80%",
  },
  createAreaInput: {
    width: "100%",
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
  },
  createAreaInputContainer: {
    backgroundColor: "#233442",
    display: "flex",
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 40,
  },
});

export default CreateAreas;
