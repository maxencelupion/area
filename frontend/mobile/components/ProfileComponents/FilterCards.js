import React, {useCallback, useState} from 'react';
import {Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import ServiceCard from "../ServicesComponents/ServicesCard";
import PredefinedAreasCard from "../AreasComponents/PredefinedAreasCard";
import {getServiceColor, getServiceIcon} from "../Utils/GetServicesData";

const FilterCards = ({type, filteredCards, reloadServices}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reloadServices().then(() => {
      setRefreshing(false);
    }).catch((error) => {
      console.error('Error refreshing areas:', error);
      setRefreshing(false);
    });
  }, [reloadServices]);

  return (
    <ScrollView
      style={styles.filterCardContainer}
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="#FF0054"
        colors={["#FF0054"]}
        progressBackgroundColor="#011627" />}
    >
      {type === 'Services' && filteredCards.map((card, index) => (
        <ServiceCard
          key={index}
          _width={card._width}
          _height={250}
          _color={getServiceColor(card.front_data)}
          _icon={getServiceIcon(card.front_data)}
          _title={card.name}
          _style={styles.allCardStyle}
          _id={card.id}
          _description={card.description}
        />
      ))}

      {type === 'Areas' && filteredCards.map((card, index) => (
        <PredefinedAreasCard
          key={index}
          _width={card._width}
          _height={card._height}
          _color={card._color}
          _service={card._service}
          _text={card._text}
          _titleIcon={card._titleIcon}
          _actionIcon={card._actionIcon}
          _style={styles.allCardStyle}
        />
      ))}

      {filteredCards.length === 0 &&
        <Text style={styles.nothingFound}>Nothing Found</Text>
      }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  filterCardContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
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

export default FilterCards;