import axios from 'axios';

const GetActionOrReactionById = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/elements/${id}`, {
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

export default GetActionOrReactionById;