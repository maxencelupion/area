import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Navigation from './navigation/Navigation';
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#011627");
    NavigationBar.setButtonStyleAsync("light");

    SplashScreen.preventAutoHideAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF0054" />
      </View>
    );
  }

  return <Navigation />;
}