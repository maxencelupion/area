import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import InformationCards from "../components/ProfileComponents/InformationCards";
import { Ionicons } from 'react-native-vector-icons';
import {profileInfosRequest} from "../components/Request/MobileConnectedRequest";
import {PutChangeProfileInfos} from "../components/Request/MobileRequestPut";

const ProfileInformationScreen = () => {
  const [userInfos, setUserInfos] = useState({});
  const [changeData, setChangeData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInformation = async () => {
    try {
      const response = await profileInfosRequest();
      setUserInfos(response.data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInformation();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  useEffect(() => {
    if (changeData) {
      setChangeData(false);
      PutChangeProfileInfos(userInfos);
    }
  }, [changeData]);

  return (
    <View style={styles.profileInfosContainer}>
      <Text style={styles.profileInfosHeaderText}>All your personal information is displayed here. Modify this information by clicking on the cards</Text>
      {userInfos &&
      <ScrollView
        style={styles.profileInfosList}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FF0054"
          colors={["#FF0054"]}
          progressBackgroundColor="#011627" />}
      >
        <InformationCards _title={"Surname"} _icon={<Ionicons name="person" size={25} color="#FF0054"/>} _content={userInfos.surname} setUserInfos={setUserInfos} setChangeData={setChangeData}/>
        <InformationCards _title={"Lastname"} _icon={<Ionicons name="create" size={25} color="#FF0054"/>} _content={userInfos.lastname} setUserInfos={setUserInfos} setChangeData={setChangeData}/>
        <InformationCards _title={"Email"} _icon={<Ionicons name="mail-unread" size={25} color="#FF0054"/>} _content={userInfos.email} change={false} setUserInfos={setUserInfos} setChangeData={setChangeData}/>
        {!userInfos.createdWithService && <InformationCards _title={"Password"} _icon={<Ionicons name="lock-closed" size={25} color="#FF0054"/>}
                           _content={"**********"} setUserInfos={setUserInfos} setChangeData={setChangeData}
                           isPassword={true}/>}
        <InformationCards _title={"Language"} _icon={<Ionicons name="globe" size={25} color="#FF0054"/>} _content={"English"} change={false} setUserInfos={setUserInfos} setChangeData={setChangeData}/>
      </ScrollView>}
    </View>
  )
}

const styles = StyleSheet.create({
  profileInfosContainer: {
    flex: 1,
    backgroundColor: '#011627',
  },
  profileInfosHeaderText: {
    color: "white",
    alignSelf: "center",
    margin: 20,
    fontSize: 15,
    fontWeight: "bold",
    opacity: 0.7,
  },
  profileInfosList: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
  },
})

export default ProfileInformationScreen;