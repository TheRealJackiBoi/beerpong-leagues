"use client";

import React from 'react';
import BeerCup from './BeerCup';

type PyramidProps = {
  rows: number;
  selectedPlayer: string,
  updateCupsMade: (name: string, change: number) => void,
};

const Pyramid: React.FC<PyramidProps> = ({ rows, selectedPlayer, updateCupsMade }) => {
  // Create an array to represent the rows in the pyramid
  const pyramid = Array.from({ length: rows }, (_, i) => i + 1);

  // Function to handle click on a circle
  const handleClick = (row: number, col: number) => {
    //alert( selectedPlayer + ` hit cup at row ${row}, column ${col} clicked!`);
    updateCupsMade(selectedPlayer, 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {pyramid.map((cols, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          {Array.from({ length: cols }, (_, colIndex) => (
            <BeerCup key={colIndex} onClick={() => handleClick(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Pyramid;