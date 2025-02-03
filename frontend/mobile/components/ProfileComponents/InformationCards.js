import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Titles from "../Titles";
import ChangeModal from "../Modals/ChangeModal";

const InformationCards = ({ _title, _content, _icon, change = true, setUserInfos, setChangeData, isPassword = false}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.infosCardContainer}
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.textContainer}>
          <Titles _title={_title} _size={20} />
          <Titles _title={_content} _size={15} _color={"white"} />
          {change && <Titles _title={`Change your ${_title}`} _color={"white"} _size={15}/> ||
            <Titles  _title={`Cannot change your ${_title}`}  _size={15}/>}
        </View>
        <View style={styles.iconContainer}>
          {_icon}
        </View>
      </TouchableOpacity>

      {change && <ChangeModal _title={_title} _content={_content} setModalVisible={setModalVisible} isModalVisible={isModalVisible} _icon={_icon} setUserInfos={setUserInfos} setChangeData={setChangeData} isPassword={isPassword}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  infosCardContainer: {
    width: "90%",
    backgroundColor: 'rgba(31, 59, 87, 1)',
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default InformationCards;