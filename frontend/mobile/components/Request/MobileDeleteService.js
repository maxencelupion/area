import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {IP} from "./MobileEnvData";

const DeleteServiceById = async (id) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.delete(`${IP}/services/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default DeleteServiceById;