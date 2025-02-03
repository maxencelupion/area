import axios from 'axios';

const putChangeProfileInfos = async (userInfos) => {
  try {
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/auth/profile`, userInfos,
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

export default putChangeProfileInfos;