import React, { useState, useEffect } from 'react';

function HeaderCell(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = () => {
    if (isDragging) {
      setIsSelected(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (isDragging) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <th
      className={`cell selectable-column ${isSelected ? 'selected' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {props.value}
    </th>
  );
}

export default HeaderCell;