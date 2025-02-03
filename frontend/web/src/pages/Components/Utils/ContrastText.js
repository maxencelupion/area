import React from 'react';

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

const ContrastText = ({ backgroundColor = "#000000", children }) => {
  const textColor = getContrastYIQ(backgroundColor);
  return (
    <div style={{ backgroundColor, color: textColor, padding: '10px', borderRadius: '1px', width: "100%" }}>
      {children}
    </div>
  );
};

export default ContrastText;
