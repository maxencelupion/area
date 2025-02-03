import ProfileNavigation from './ProfileNavigation';
import HomepageScreen from '../screens/HomepageScreen';
import ServicesScreen from '../screens/ServicesScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { TouchableOpacity } from 'react-native';

const headOptions = ({ navigation }) => ({
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

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        backgroundColor: '#011627',
        borderTopWidth: 0,
        height: 60,
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Services') {
          iconName = focused ? 'briefcase' : 'briefcase-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FF0054',
      tabBarInactiveTintColor: 'white',
    })}
  >
    <Tab.Screen
      name="Services"
      component={ServicesScreen}
      options={({ navigation }) => headOptions({ navigation })}
    />
    <Tab.Screen
      name="Home"
      component={HomepageScreen}
      options={({ navigation }) => headOptions({ navigation })}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigation}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
