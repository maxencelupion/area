import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Titles from "../components/Titles";
import ProfileCards from "../components/ProfileComponents/ProfileCards";
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileInfosRequest} from "../components/Request/MobileConnectedRequest";

const ProfileMainScreen = () => {
  const [userInfos, setUserInfos] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    profileInfosRequest().then(response => {
      setUserInfos(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      Alert.alert("Signed Out", "You have been signed out successfully.");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Failed to sign out: ', error);
    }
  };

  const ProfileTab = [
    {
      name: "Personal information",
      icon: <Ionicons name="person-outline" size={25} color="white" />,
      onPress: () => navigation.navigate('ProfileInformation')
    },
    {
      name: "Your services",
      icon: <Ionicons name="key-outline" size={25} color="white" />,
      onPress: () => navigation.navigate('ProfileServices')
    },
    {
      name: "Help",
      icon: <Ionicons name="help-circle-outline" size={25} color="white" />,
      onPress: () => navigation.navigate('HelpScreen')
    },
    {
      name: "Sign Out",
      icon: <Ionicons name="log-out-outline" size={25} color="white" />,
      onPress: handleSignOut
    }
  ];

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Titles _title={"Your Account"} _style={styles.profileTitle} _margin={[20, 20, 20, 20]} />
        {userInfos && <Text style={styles.profileHeaderMail}>{userInfos.email}</Text>}
      </View>
      <ScrollView style={styles.profileCardList}>
        {ProfileTab.map((card, index) => (
          <ProfileCards
            key={index}
            _text={card.name}
            _icon={card.icon}
            _style={styles.profileCardAdditionalStyle}
            _onPress={card.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#011627',
  },
  profileHeader: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#FF0054",
  },
  profileHeaderMail: {
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "bold",
    opacity: 0.7,
    fontSize: 15,
  },
  profileTitle: {
    alignSelf: "center",
  },
  profileCardList: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  profileCardAdditionalStyle: {
    marginBottom: 15,
  },
});

export default ProfileMainScreen;
