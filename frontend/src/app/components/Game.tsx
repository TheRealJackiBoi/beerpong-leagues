"use client";

import React from "react";
import {useState, useEffect} from "react";
import Pyramid from "./Pyramid";
import {Button, ButtonGroup} from "@nextui-org/button";


type Player = {
    name: string,
    cupsMade: number 
}


type GameProps = {};
  
  const Game: React.FC<GameProps> = ({}) => {

    const [headingText, setHeadingText] = useState<string>('Select a player...');

    const [selectedPlayer, setSelectedPlayer] = useState<string>("None");
    const [players, setPlayers] = useState<Player[]>([]);

    const selectPlayer = (player: string) =>{
        setHeadingText(player + " is throwing...");
        setSelectedPlayer(player);
    }

    const updateCupsMade = (name: string, change: number) => {
        //const player = players.find(player => player.name ===name);
        //if (player) {alert(name + " has score " + player.cupsMade)}

        //This gets run twice
        setPlayers(prev => prev.map(player => {
            if (player.name == name){
                player.cupsMade += change;
            }
            return player;
        }));
      };

    const addPlayer = (newPlayer: Player) => {
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    };


    useEffect(() => {
        addPlayer({name: "Christian", cupsMade: 0});
        addPlayer({name: "Jack", cupsMade: 0});
    }, []); // Empty dependency array means this runs only on mount

    return (
        <div>
            <h1>{headingText}</h1>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                <div style={{backgroundColor: "#0070f3"}}>
                    <Pyramid rows={4} selectedPlayer={selectedPlayer} updateCupsMade={updateCupsMade} />
                </div>
            
                <div style={{backgroundColor: "#337000"}}>
                    <h1>Select player to throw</h1>
                    <div style={{display: "flex", justifyContent: "center", gap: "40px"}}>
                        {
                            players.map((item, index) => (
                                <Button key={index} color="primary" variant="solid" onClick={ () => {selectPlayer(item.name); }}>{item.name}</Button>
                            ))
                        }
                    </div>

                </div>
            </div>
            <div>
                <h1>Stats:</h1>
                <div>
                    {
                        players.map((item, index) => (
                            <p key={index}>{item.name}: {item.cupsMade}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
  };

  export default Game;