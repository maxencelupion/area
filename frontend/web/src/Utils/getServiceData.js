export const getServiceIcon = (data) => {
  try {
    const parsedData = JSON.parse(data);
    return parsedData.icon.slice(1);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getServiceColor = (data) => {
  try {
    const parsedData = JSON.parse(data);
    return parsedData.color;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
