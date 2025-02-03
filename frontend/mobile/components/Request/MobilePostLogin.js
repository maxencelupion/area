import axios from 'axios';
import {IP} from "./MobileEnvData"

const MobilePostLogin = async (data) => {
  try {
    const response = await axios.post(`${IP}/auth/login`, data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default MobilePostLogin;