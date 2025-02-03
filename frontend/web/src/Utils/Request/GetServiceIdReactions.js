import axios from 'axios';

const GetServiceIdReactions = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/services/${id}/reactions`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default GetServiceIdReactions;