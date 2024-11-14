"use client";

import React from "react";
import Pyramid from "./Pyramid";
import {Button, ButtonGroup} from "@nextui-org/button";


type GameProps = {};
  
  const Game: React.FC<GameProps> = ({}) => {
    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
          <div style={{backgroundColor: "#0070f3"}}>
            <h1>Beer Pong Tracker</h1>
            <Pyramid rows={4} />
          </div>
        
          <div style={{backgroundColor: "#337000"}}>

            <div style={{display: "flex", justifyContent: "center", gap: "40px"}}>
              <Button color="primary" variant="solid" >Christian</Button>
              <Button color="primary" variant="solid" >Jack</Button>
            </div>

            <div>
              <h1>Team 2</h1>
            </div>
          
          </div>

        </div>
    );
  };

  export default Game;