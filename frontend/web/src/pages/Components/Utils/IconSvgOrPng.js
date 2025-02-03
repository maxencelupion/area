import React, { useEffect, useState } from 'react';

const fetchSvgContent = async (svgPath) => {
  try {
    const response = await fetch(svgPath);
    const svgContent = await response.text();
    return svgContent;
  } catch (error) {
    console.error('Error fetching SVG:', error);
    return null;
  }
};

const IconSvgComponent = ({ svgPath, backgroundColor = '#FFFFFF' }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const loadSvg = async () => {
      const content = await fetchSvgContent(svgPath.replace('.png', '.svg'));
      setSvgContent(content);
    };
    loadSvg();
  }, [svgPath]);

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 4), 16);
    const b = parseInt(hexcolor.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  }
  const fillColor = getContrastYIQ(backgroundColor);

  return (
    <div>
      {svgContent ? (
        <svg
          dangerouslySetInnerHTML={{
            __html: svgContent.replace(/fill=".*?"/g, '').replace('<svg', `<svg fill="${fillColor}"`),
          }}
          style={{ width: '24px', height: '24px' }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IconSvgComponent;
