import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IP} from "./MobileEnvData";

const MobileGetServiceConnection = async (id) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
        throw new Error('Token not found');
      }

    const response = await axios.get(`${IP}/services/${id}/status`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default MobileGetServiceConnection;