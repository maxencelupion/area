import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IP} from "./MobileEnvData"

const PutChangeAreaStatus = async (id) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.put(
      `${IP}/areas/${id}/status`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const PutChangeProfileInfos = async (userInfos) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.put(
      `${IP}/auth/profile`,
      userInfos,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export {PutChangeAreaStatus, PutChangeProfileInfos};