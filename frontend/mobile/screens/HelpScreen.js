import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Titles from "../components/Titles";
import { Ionicons } from 'react-native-vector-icons';

function MobileHelpList({elements}) {
  return (
    <View style={styles.helpElements}>
      <View style={styles.helpElementsHeader}>
        {elements.icon}
        <Titles _title={elements.title} _size={20} />
      </View>

      <View style={styles.helpElementList}>
        {elements.list.map((elem, index) => (
          <View key={index} style={styles.helpListContainer}>
            <Ionicons name="ellipse" size={10} color="white" />
              <Text style={styles.helpElementsText}>{elem.text}</Text>

          </View>
        ))}
      </View>

    </View>
  )
}

const HelpScreen = () => {

  const ConnectServiceList = {
    title: "How to connect / disconnect to a Service ?",
    icon: <Ionicons name="briefcase" size={25} color="#FF0054" />,
    list: [
      {text: "Go to the services page", element: null},
      {text: "Click on the service you want to connect", element:null},
      {text: "Click on the connection / disconnection button in the service page", element:null},
    ]
  }

  const CreateAreaList = {
    title: "How to create an area ?",
    icon: <Ionicons name="layers" size={25} color="#FF0054" />,
    list: [
      {text: "Go to your area page on the top right or via the home page", element: null},
      {text: "Go to \"Create Area\"", element: null},
      {text: "Enter a name and a description for you area", element:null},
      {text: "Select at least 1 action and 1 reaction (you can add maximum 3 reactions)", element:null},
      {text: "Select a color", element:null},
      {text: "Create your area !", element:null},
    ]
  }

  const DeactivateArea = {
    title: "How to activate / deactivate an area ?",
    icon: <Ionicons name="layers" size={25} color="#FF0054" />,
    list: [
      {text: "Go to the my area page", element: null},
      {text: "On the \"Your Areas\" tab, select the area you want to modify", element: null},
      {text: "Once on the area page, you can change his status", element:null},
    ]
  }

  const DeleteArea = {
    title: "How to delete an area ?",
    icon: <Ionicons name="layers" size={25} color="#FF0054" />,
    list: [
      {text: "Go to the my area page.", element: null},
      {text: "On the \"Your Areas tab\", select the area you want to delete.", element: null},
      {text: "Click on the delete button and confirm the deletion.", element: null},
    ]
  }

  const ChangeProfileInfos = {
    title: "How to change your profile information ?",
    icon: <Ionicons name="person" size={25} color="#FF0054" />,
    list: [
      {text: "Go to your profile page", element: null},
      {text: "Click on the \"Personal information\" button", element: null},
      {text: "Click on the card of the element you wish to change", element: null},
      {text: "You can now change your first name, last name or password!", element: null},
    ]
  }

  return (
    <ScrollView style={styles.helpContainer}>
      <View style={styles.helpHeader}>
        <Titles _title={"Help"} _size={30}/>
        <Text style={styles.helpHeaderText}>You are on the help page. This page will answer all your questions about Services, Areas, Login and more...</Text>
      </View>
      <View style={styles.helpList}>
        <MobileHelpList elements={ConnectServiceList} />
        <MobileHelpList elements={CreateAreaList} />
        <MobileHelpList elements={DeactivateArea} />
        <MobileHelpList elements={DeleteArea} />
        <MobileHelpList elements={ChangeProfileInfos} />
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  helpContainer: {
    flex: 1,
    backgroundColor: '#011627',
    width: "100%",
    marginBottom: 60
  },
  helpHeader: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 40,
  },
  helpHeaderText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  helpList: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  helpElements: {
    width: "90%",
    alignSelf: "center",
  },
  helpElementsHeader: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  helpElementList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
  },
  helpListContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  helpElementsText: {
    color: "white"
  },
});

export default HelpScreen;