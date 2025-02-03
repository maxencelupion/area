import {RefreshControl, ScrollView, StyleSheet, View, Text} from "react-native";
import AreaCard from "./AreaCard";
import React, {useCallback, useState} from "react";
import Titles from "../Titles";
import { Ionicons } from 'react-native-vector-icons';

const DisplayAreas = ({userAreas, reloadAreas}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reloadAreas().then(() => {
      setRefreshing(false);
    }).catch((error) => {
      console.error('Error refreshing areas:', error);
      setRefreshing(false);
    });
  }, [reloadAreas]);

  if (userAreas.length === 0) {
    return (
      <ScrollView
        style={styles.noAreaText}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FF0054"
          colors={["#FF0054"]}
          progressBackgroundColor="#011627" />}
      >
        <View style={{alignSelf: "center", marginBottom: 20}}><Ionicons name="search-outline" size={40} color="white" /></View>
        <Titles _title={"No area created yet"} _color={"white"}/>
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.displayAreaContainer}
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="#FF0054"
        colors={["#FF0054"]}
        progressBackgroundColor="#011627" />}>
      <ScrollView style={styles.areasListContainer}>
        {userAreas.map((card, index) => (
          <AreaCard key={index} area={card} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noAreaText: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 50,
  },
  displayAreaContainer: {
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
  areasListContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  areasCardStyles: {
    marginBottom: 20,
  },
  myareaTitle: {
    alignSelf: "center",
  },
});

export default DisplayAreas;