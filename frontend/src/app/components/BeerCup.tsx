"use client";

import React from "react";
import { useState } from "react";


type BeerCupProps = {
    onClick: () => void;
    color?: string;
};
  
  const BeerCup: React.FC<BeerCupProps> = ({ onClick, color = 'red' }) => {


    return (
      <div
        onClick={onClick}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: color,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
    );
  };

  export default BeerCup;