const getServiceIcon = (data) => {
  try {
    const parsedData = JSON.parse(data);
    return parsedData.icon;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const getServiceColor = (data) => {
  try {
    const parsedData = JSON.parse(data);
    return parsedData.color;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export {getServiceIcon, getServiceColor};