import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ColorPicker, { Panel1, Preview, HueSlider } from 'reanimated-color-picker';
import Titles from "../Titles";

const ColorSelector = ({ setColor }) => {

  const onSelectColor = ({ hex }) => {
    setColor(hex);
  };
  return (
    <View style={styles.colorContainer}>
      <Titles _title={"Select your area color !"}/>
      <ColorPicker style={styles.colorPicker} value='red' onComplete={onSelectColor}>
        <Panel1 />
        <HueSlider />
        <Preview hideInitialColor={true} />
      </ColorPicker>
    </View>
  );
};

export default ColorSelector;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  colorPicker: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});
