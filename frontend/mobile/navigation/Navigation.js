import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import { StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import MyAreaScreen from '../screens/MyAreaScreen';
import SigninScreen from '../screens/SigninScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AreaTemplateScreen from "../screens/AreaTemplateScreen";
import ServiceTemplateScreen from "../screens/ServiceTemplate";

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

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#011627" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyArea"
            component={MyAreaScreen}
            options={({ navigation }) => ({
              ...headOptions({ navigation }),
              headerShown: true,
              title: 'My Area',
            })}
          />
          <Stack.Screen
            name="AreaTemplate"
            component={AreaTemplateScreen}
            options={{
              headerStyle: {
                backgroundColor: '#011627',
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: 'bold' },
              title: 'Area Details',
            }}
          />
          <Stack.Screen
            name="ServiceTemplate"
            component={ServiceTemplateScreen}
            options={{
              headerStyle: {
                backgroundColor: '#011627',
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: 'bold' },
              title: 'Service Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
