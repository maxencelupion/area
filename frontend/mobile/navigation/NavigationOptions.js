import React from 'react';
import {TouchableOpacity} from "react-native";
import { Ionicons } from 'react-native-vector-icons';

const headOptions = (navigation) => ({
  headerStyle: {
    backgroundColor: '#011627',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: { fontWeight: 'bold' },
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('MyArea')}>
      <Ionicons name="layers-outline" size={25} color="#ffffff" style={{ marginRight: 15 }} />
    </TouchableOpacity>
  ),
});

export default headOptions;