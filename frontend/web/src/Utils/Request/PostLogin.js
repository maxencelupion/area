import axios from 'axios';

const PostLogin = async (data) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/auth/login`, data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l envoi des données:', error);
    throw error;
  }
};

export default PostLogin;
