import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MobilePostRegister from '../components/Request/MobilePostRegister';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { IP } from "../components/Request/MobileEnvData";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 4 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleNameChange = (name, type) => {
    if (type === 'surname') {
      setSurname(name);
      if (!validateName(name)) {
        setSurnameError('Surname is required');
      } else {
        setSurnameError('');
      }
    } else if (type === 'lastname') {
      setLastname(name);
      if (!validateName(name)) {
        setLastnameError('Lastname is required');
      } else {
        setLastnameError('');
      }
    }
  };

  const handleSignUp = async () => {
    if (emailError || passwordError || surnameError || lastnameError || !validateEmail(email) || !validatePassword(password) || !validateName(surname) || !validateName(lastname)) {
      Alert.alert('Registration failed', 'Please fill in all fields correctly');
      return;
    }

    const data = { email, password, surname, lastname };

    try {
      const response = await MobilePostRegister(data);
      if (response.access_token) {
        await AsyncStorage.setItem('access_token', response.access_token);
        navigation.navigate('Tabs');
      } else {
        Alert.alert('Registration failed', 'Please check your inputs or try again later.');
      }
    } catch (error) {
      Alert.alert('Registration Error', 'An error occurred during registration. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    const googleAuthUrl = `${IP}/auth/google/callback?state=area://Tabs`;
    Linking.openURL(googleAuthUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };

  const handleMicrosoftSignIn = () => {
    const googleAuthUrl = `${IP}/auth/microsoft/callback?state=area://Tabs`;
    Linking.openURL(googleAuthUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.createAccountTitle}>Create Account</Text>
          <Text style={styles.createAccountSubtitle}>
            Create an account so you can explore all the existing Applets
          </Text>
        </View>

        <View style={styles.formContainer}>
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
            onChangeText={handlePasswordChange}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Surname"
            placeholderTextColor="#626262"
            value={surname}
            onChangeText={(text) => handleNameChange(text, 'surname')}
          />
          {surnameError ? <Text style={styles.errorText}>{surnameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Lastname"
            placeholderTextColor="#626262"
            value={lastname}
            onChangeText={(text) => handleNameChange(text, 'lastname')}
          />
          {lastnameError ? <Text style={styles.errorText}>{lastnameError}</Text> : null}

          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginRedirectButton}
            onPress={() => navigation.navigate('Signin')}
          >
            <Text style={styles.loginRedirectText}>Already have an account</Text>
          </TouchableOpacity>
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
      </ScrollView>
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
    left: 434.09,
    backgroundColor: 'white',
    borderRadius: 9999,
  },
  circleSmall: {
    width: 496,
    height: 496,
    position: 'absolute',
    top: 185,
    left: 343.09,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  createAccountTitle: {
    color: '#FF0054',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  createAccountSubtitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    width: 326,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  input: {
    width: 357,
    paddingVertical: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF0054',
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
  signupButton: {
    width: 357,
    paddingVertical: 15,
    backgroundColor: '#FF0054',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#CBD6FF',
    marginTop: 20,
    marginBottom: 10,
  },
  signupButtonText: {
    color: '#011627',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  loginRedirectButton: {
    width: 357,
    paddingVertical: 10,
    backgroundColor: '#011627',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0054',
  },
  loginRedirectText: {
    color: 'white',
    fontSize: 14,
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
});
