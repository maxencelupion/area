import axios from 'axios';
import {IP} from "./MobileEnvData"

const MobilePostRegister = async (data) => {
  try {
    const response = await axios.post(`${IP}/auth/register`, data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default MobilePostRegister;
