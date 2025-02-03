import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileMainScreen from '../screens/ProfileMainScreen';
import ProfileInfoScreen from '../screens/ProfileInformationScreen';
import ProfileServicesScreen from '../screens/ProfileServicesScreen';
import HelpScreen from "../screens/HelpScreen";

import headOptions from "./NavigationOptions";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={({ navigation }) => headOptions(navigation)}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileMainScreen}
        options={{
          title: 'Profile',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="ProfileInformation"
        component={ProfileInfoScreen}
        options={{ title: 'Personal Information' }}
      />
      <Stack.Screen
        name="ProfileServices"
        component={ProfileServicesScreen}
        options={{ title: 'Your Services' }}
      />
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{ title: 'Help' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
