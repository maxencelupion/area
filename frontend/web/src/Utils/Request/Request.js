import axios from "axios";

export const RequestGet = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

export const servicesRequest = async () => {
  return await RequestGet(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/services`);
}

export const actionsRequest = async () => {
  return await RequestGet(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/actions`);
}

export const reactionsRequest = async () => {
  return await RequestGet(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/reactions`);
}

export const profileRequest = async () => {
  const token = localStorage.getItem("access_token");
  return await axios.get(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const connectedServicesRequest = async () => {
  const token = localStorage.getItem("access_token");
  return await axios.get(`${process.env.NEXT_PUBLIC_BACK_LOCALHOST}/services/connected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}