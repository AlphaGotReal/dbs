import React, { useState } from 'react';

const HoverText = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <p>This text changes on hover!</p>
      ) : (
        <p>Hover over me to see the change!</p>
      )}
    </div>
  );
};

export default HoverText;