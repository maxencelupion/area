import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from 'react-native-vector-icons';
import {useEffect, useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import AlertAreas from "../Alerts/AlertAreas";
import CreateElementCard from "../Elements/CreateElementCard";

const AreaModal = ({ setModalDisplay, modalDisplay, setSelected, element, services }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedElement, setSelectedElement] = useState([])
  const [serviceNotConnected, setServiceNotConnected] = useState(null)

  useEffect(() => {
    setItems([
      { label: 'All', value: 'All' },
      ...services.map(service => ({
        label: service.name,
        value: service.id,
      }))
    ]);
  }, [services]);

  useEffect(() => {
    setSelectedElement(element)
  }, [element]);


  const sortItems = () => {
    if (selectedService === "All") {
      setSelectedElement(element);
    } else {
      setSelectedElement(element.filter(elem => elem.serviceId === selectedService));
    }
  }

  return (
    <View>
      <Modal
        transparent={true}
        visible={modalDisplay}
        onRequestClose={() => setModalDisplay(false)}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalDisplay(false)} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.dropdownServices}>
              <DropDownPicker
                open={open}
                value={selectedService}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedService}
                setItems={setItems}
                placeholder="Select a service"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
                onChangeValue={() => sortItems()}
              />
            </View>

            <FlatList
              data={selectedElement}
              renderItem={({ item }) => (
                <CreateElementCard item={item} setSelected={setSelected} services={services} setModalDisplay={setModalDisplay} setShowAlert={setShowAlert} setServiceNotConnected={setServiceNotConnected}/>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
      {showAlert && <AlertAreas selectedService={serviceNotConnected} setShowAlert={setShowAlert} showAlert={showAlert} setModalDisplay={setModalDisplay}/>}
    </View>
  )
};

const styles = StyleSheet.create({
  dropdownServices: {
    paddingVertical: 20,
    backgroundColor: '#011627',
    zIndex: 100,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    width: "100%",
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#011627',
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
});

export default AreaModal;