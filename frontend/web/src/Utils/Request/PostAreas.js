import axios from 'axios';

const PostAreas = async (data) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/areas`, data,
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

export default PostAreas;
