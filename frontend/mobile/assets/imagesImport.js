const importAll = (requireContext) => {
  let images = {};
  requireContext.keys().forEach((key) => {
    const imageName = key.replace('./', '');
    images[imageName] = requireContext(key);
  });
  return images;
};

const images = importAll(require.context('./services', false, /\.(png|jpe?g|svg)$/));

const getImageSource = (imagePath) => {
  const imageName = imagePath.split('/').pop();

  if (images[imageName]) {
    return images[imageName];
  } else {
    console.warn(`Image for ${imageName} not found, using default image.`);
    return images['facebook.png'];
  }
};

export default getImageSource;
