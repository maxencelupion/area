import ServiceCard from "./ServicesCard";
import PredefinedAreasCard from "../AreasComponents/PredefinedAreasCard";
import {ActivityIndicator, ScrollView, StyleSheet, Text} from "react-native";
import React from "react";
import {getServiceColor, getServiceIcon} from "../Utils/GetServicesData";

const ServicesCardsScroll = ({activeSearch, filteredServicesCards, filteredActionsCards}) => {


  if (!filteredServicesCards || !filteredActionsCards) {
    return <ActivityIndicator size="large" color="#FF0054" />;
  }

  return (
    <ScrollView style={styles.serviceCardContainer}>
      {(activeSearch === 'All' || activeSearch === 'Services') && filteredServicesCards.map((card, index) => (
        <ServiceCard
          key={index}
          _width={200}
          _height={250}
          _color={getServiceColor(card.front_data)}
          _icon={getServiceIcon(card.front_data)}
          _title={card.name}
          _style={styles.allCardStyle}
          _id={card.id}
          _description={card.description}
        />
      ))}

      {(activeSearch === 'All' || activeSearch === 'Areas') && filteredActionsCards.map((card, index) => (
        <PredefinedAreasCard
          key={index}
          _width={card._width}
          _height={card._height}
          _color={card._color}
          _title={card._service}
          _action={card._action}
          _reaction={card._reaction}
          _reactionIcon={card._reactionIcon}
          _actionIcon={card._actionIcon}
          _actionId={card._actionId}
          _reactionId={card._reactionId}
          _style={styles.allCardStyle}
          _navigate={'MyArea'}
        />
      ))}
      {filteredActionsCards.length === 0 && filteredServicesCards.length === 0 &&
        <Text style={styles.nothingFound}>Nothing Found</Text>
      }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  serviceCardContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  allCardStyle: {
    marginBottom: 20,
  },
  nothingFound: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default ServicesCardsScroll;