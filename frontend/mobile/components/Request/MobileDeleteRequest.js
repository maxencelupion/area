import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IP} from "./MobileEnvData"

const DeleteAreaById = async (id) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.delete(`${IP}/areas/${id}`, {
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


export default DeleteAreaById;