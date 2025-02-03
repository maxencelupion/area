import axios from 'axios';

const GetServiceConnection = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/services/${id}/status`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default GetServiceConnection;