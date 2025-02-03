import axios from 'axios';

const DeleteAreas = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/areas/${id}`, {
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

export default DeleteAreas;
