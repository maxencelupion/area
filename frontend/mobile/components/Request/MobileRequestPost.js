import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IP} from "./MobileEnvData"

const PostNewArea = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.post(`${IP}/areas`, data, {
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
}

export default PostNewArea;