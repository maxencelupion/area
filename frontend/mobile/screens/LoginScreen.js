import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MobileGetServiceConnection from '../components/Request/MobileGetServiceConnection';

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          try {
            const response = await MobileGetServiceConnection(1);
            if (response.status === false || response.status === true) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Tabs' }],
              });
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              await AsyncStorage.removeItem('access_token')
            }
          }
        }
      } catch (error) {
        console.error('Failed to check token or authenticate user:', error);
      }
    };

    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      <View style={styles.loginContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/loginpage/login.png')} style={styles.loginImage} alt={""} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.loginTitle}>Exclusive triggers, actions, and services</Text>
          <Text style={styles.loginDescription}>
            Get complete access to the different ways you can connect the tools you use every day in your life.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011627',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    gap: 20,
  },
  circleLarge: {
    width: 635,
    height: 635,
    position: 'absolute',
    top: -557,
    left: 148,
    backgroundColor: '#F8F9FF',
    borderRadius: 9999,
    zIndex: 1,
  },
  circleSmall: {
    width: 496,
    height: 496,
    position: 'absolute',
    top: -342,
    left: 107,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#F8F9FF',
    zIndex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  loginImage: {
    width: 300,
    height: 300,
    zIndex: 2,
    resizeMode: 'contain',
    alignSelf: "center",
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 3,
    marginBottom: 40,
  },
  loginTitle: {
    color: '#FF0054',
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 35,
  },
  loginDescription: {
    color: 'white',
    fontSize: 16,
    width: 360,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonContainer: {
    display: "flex",
    flexDirection: 'row',
    gap: 10,
  },
  loginButton: {
    height: 60,
    width: 160,
    paddingHorizontal: 20,
    backgroundColor: '#FF0054',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#CBD6FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  loginButtonText: {
    color: '#011627',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  registerButton: {
    height: 60,
    width: 160,
    paddingHorizontal: 20,
    backgroundColor: '#011627',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0054',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
});
