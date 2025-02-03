import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {IP} from "./MobileEnvData"


const connectedAreasRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token not found');
    }

    return await axios.get(`${IP}/areas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const profileInfosRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token not found');
    }

    return await axios.get(`${IP}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const servicesConnectedRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token not found');
    }

    return await axios.get(`${IP}/services/connected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const isServiceConnectedRequest = async (id) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token not found');
    }

    return await axios.get(`${IP}/services/${id}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {connectedAreasRequest, profileInfosRequest, servicesConnectedRequest, isServiceConnectedRequest}