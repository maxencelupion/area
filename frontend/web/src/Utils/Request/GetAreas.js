import axios from 'axios';

const GetAreas = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/areas`, {
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

export default GetAreas;