import axios from 'axios';

const PutChangeAreaStatus = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/areas/${id}/status`, {},
      {
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

export default PutChangeAreaStatus;