import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MobilePostLogin from '../components/Request/MobilePostLogin';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function SigninScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const start_url = `https://${process.env.EXPO_PUBLIC_IP_MACHINE}`;

  useEffect(() => {
    const handleUrl = async ({ url }) => {
      if (url) {
        const token = extractAccessToken(url);
        if (token) {
          await AsyncStorage.setItem('access_token', token);
          navigation.navigate('Tabs');
        }
      }
    };

    const linkingListener = Linking.addEventListener('url', handleUrl);

    return () => {
      linkingListener.remove();
    };
  }, []);

  const extractAccessToken = (url) => {
    const match = url.match(/access_token=([^&]+)/);
    return match ? match[1] : null;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(validateEmail(email) ? '' : 'Invalid email format');
  };

  const handleSignIn = async () => {
    if (emailError || !validateEmail(email)) {
      Alert.alert('Login failed', 'Please enter a valid email');
      return;
    }
    const data = { email, password };
    try {
      const response = await MobilePostLogin(data);
      if (response.access_token) {
        await AsyncStorage.setItem('access_token', response.access_token);
        navigation.navigate('Tabs');
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Login failed', 'Invalid email or password. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    const googleAuthUrl = `${start_url}/auth/google/callback?state=area://Signin`;
    Linking.openURL(googleAuthUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };

  const handleMicrosoftSignIn = () => {
    const microsoftAuthUrl = `${start_url}/auth/microsoft/callback?state=area://Signin`;
    Linking.openURL(microsoftAuthUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      <View style={styles.headerContainer}>
        <Text style={styles.loginTitle}>Login here</Text>
        <Text style={styles.loginSubtitle}>Welcome back you’ve{'\n'}been missed!</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#626262"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#626262"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signinButton} onPress={handleSignIn}>
            <Text style={styles.signinButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.createAccountText}>Create new account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.orContinueText}>Or continue with</Text>

      <View style={styles.oauthButtonsContainer}>
        <TouchableOpacity style={styles.oauthButton} onPress={handleGoogleSignIn}>
          <FontAwesome name="google" size={24} color="#011627" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthButton} onPress={handleMicrosoftSignIn}>
          <FontAwesome5 name="microsoft" size={24} color="#011627" />
        </TouchableOpacity>
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
  circleLarge: {
    width: 635,
    height: 635,
    position: 'absolute',
    top: 0,
    left: 478.3,
    backgroundColor: 'white',
    borderRadius: 9999,
  },
  circleSmall: {
    width: 496,
    height: 496,
    position: 'absolute',
    top: 185,
    left: 387.3,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  loginTitle: {
    color: '#FF0054',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  loginSubtitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 357,
    paddingVertical: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF0054',
    marginBottom: 10,
    color: '#011627',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  errorText: {
    color: '#FF0054',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButton: {
    width: 357,
    paddingVertical: 15,
    backgroundColor: '#FF0054',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#CBD6FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    marginBottom: 20,
  },
  signinButtonText: {
    color: '#011627',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  orContinueText: {
    textAlign: 'center',
    color: '#FF0054',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    marginBottom: 20,
  },
  oauthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  oauthButton: {
    height: 44,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButton: {
    width: 357,
    paddingVertical: 10,
    backgroundColor: '#011627',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0054',
  },
  createAccountText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
});
