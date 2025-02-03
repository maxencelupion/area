import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Titles = ({_title, _margin = [0, 0, 0, 0], _color = "#FF0054", _size = 25, _style, onPress}) => {

  const margeTop = _margin[0];
  const margeRight = _margin[1];
  const margeBottom = _margin[2];
  const margeLeft = _margin[3];

  return (
      <Text onPress={onPress} style={[styles.titleStyle, {marginTop: margeTop, marginRight: margeRight, marginBottom: margeBottom, marginLeft: margeLeft, color: _color, fontSize: _size}, _style]}>{_title}</Text>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: "bold"
  },
});

export default Titles