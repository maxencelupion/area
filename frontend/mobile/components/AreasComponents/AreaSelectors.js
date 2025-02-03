import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Titles from "../Titles";
import AreaModal from "./AreaModal";
import AreaButtons from "../Buttons/AreaButtons";
import {useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const AreaSelectors = ({setSelectedReactions, selectedReactions, setSelectedAction,  selectedAction, actions, reactions, services}) => {

  const [isActionsModal, setIsActionsModal] = useState(Array(3).fill(false));
  const [isReactionsModal, setIsReactionsModal] = useState(Array(3).fill(false));

  const clearElements = (setSelected, type, setModal) => {
    setSelected([{ description: `Select ${type}` }]);
    setModal(Array(3).fill(false));
  }

  const addReaction = () => {
    setSelectedReactions([...selectedReactions, { description: 'Select a Reaction' }]);
    setIsReactionsModal([...isReactionsModal, false]);
  };

  const handleReactionSelection = (index, reaction, setSelected, selectedElement) => {
    const updatedReactions = [...selectedElement];
    updatedReactions[index] = reaction;
    setSelected(updatedReactions);
  };

  return (
    <>
    <View style={styles.createAreaButtonContainer}>
      <Titles _title={"If"} _size={35} />
      {selectedAction.map((action, index) => (
        <View key={index} style={styles.selectorContainer}>
          <TouchableOpacity style={styles.SelectorButton} onPress={() => {
            const modals = [...isActionsModal];
            modals[index] = true;
            setIsActionsModal(modals);
          }} activeOpacity={0.7}>
            <Text>{action.description}</Text>
          </TouchableOpacity>
          <AreaModal
            setModalDisplay={(display) => {
              const modals = [...isActionsModal];
              modals[index] = display;
              setIsActionsModal(modals);
            }}
            modalDisplay={isActionsModal[index]}
            setSelected={(selectedReaction) => handleReactionSelection(index, selectedReaction, setSelectedAction, selectedAction)}
            element={actions}
            services={services}
          />
        </View>
      ))}
      {selectedAction[0].id &&
        <AreaButtons text={"Clear action(s)"} color={"#FF0054"} icon={<Ionicons name="close-circle-outline" size={30} color="#FF0054"/>} onPress={() => clearElements(setSelectedAction, "an Action", setIsActionsModal)}/>
      }
    </View>

  <View style={styles.createAreaButtonContainer}>
    <Titles _title={"Then"} _size={35} />
    {selectedReactions.map((reaction, index) => (
      <View key={index} style={styles.selectorContainer}>
        <TouchableOpacity style={styles.SelectorButton} onPress={() => {
          const modals = [...isReactionsModal];
          modals[index] = true;
          setIsReactionsModal(modals);
        }} activeOpacity={0.7}>
          <Text>{reaction.description}</Text>
        </TouchableOpacity>
        <AreaModal
          setModalDisplay={(display) => {
            const modals = [...isReactionsModal];
            modals[index] = display;
            setIsReactionsModal(modals);
          }}
          modalDisplay={isReactionsModal[index]}
          setSelected={(selectedReaction) => handleReactionSelection(index, selectedReaction, setSelectedReactions, selectedReactions)}
          element={reactions}
          services={services}
        />
      </View>
    ))}
    {selectedReactions[selectedReactions.length - 1].id && selectedReactions.length < 3 &&
      <AreaButtons text={"Add Reaction"} color={"white"} icon={<Ionicons name="add-circle-outline" size={30} color="white"/>} onPress={addReaction} />
    }
    {selectedReactions[0].id &&
      <AreaButtons text={"Clear reaction(s)"} color={"#FF0054"} icon={<Ionicons name="close-circle-outline" size={30} color="#FF0054"/>} onPress={() => clearElements(setSelectedReactions, "a Reaction", setIsReactionsModal)}/>
    }
  </View>
    </>
  )
}

const styles = StyleSheet.create({
  SelectorButton: {
    width: "90%",
    padding: 20,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 10,
  },
  createAreaButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    gap: 10,
    marginBottom: 40,
  },
  selectorContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

});
export default AreaSelectors;