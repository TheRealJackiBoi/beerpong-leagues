"use client";

import React from "react";
import {useState, useEffect} from "react";
import Pyramid from "./Pyramid";
import {Button, ButtonGroup} from "@nextui-org/button";


type Player = {
    name: string,
    cupsMade: number 
}

type Team = {
    id: string,
    players: Player[]
}


type GameProps = {};
  
  const Game: React.FC<GameProps> = ({}) => {

    const [headingText, setHeadingText] = useState<string>('Select a player...');

    const [selectedPlayer, setSelectedPlayer] = useState<string>("None");

    const [teams, setTeams] = useState<Team[]>([
        {id: "Team1", players: [{name: "Christian", cupsMade:0}, {name: "Jack", cupsMade:0}]},
        {id: "Team2", players: [{name: "Daniel", cupsMade:0}, {name: "Gusse", cupsMade:0}]},
    ]);

    const [currentTeam, setCurrentTeam] = useState<string>("Team1");


    const selectPlayer = (player: string) =>{
        setHeadingText(player + " is throwing...");
        setSelectedPlayer(player);
    }

    const updateCupsMade = (name: string, change: number) => {
        if (!currentTeam) return;

        setTeams((prevTeams) =>
          prevTeams.map((team) => {
            // Only update the selected team
            if (team.id === currentTeam) {
              return {
                ...team,
                players: team.players.map((player) =>
                  player.name === name
                    ? { ...player, cupsMade: player.cupsMade + change }
                    : player
                ),
              };
            }
            return team;
          })
        );
      };

    const PassTurn = () => {
        if (currentTeam == "Team1"){
            setCurrentTeam("Team2");
        }else if (currentTeam == "Team2"){
            setCurrentTeam("Team1");
        }

        setHeadingText("Select a player...")
    }


    useEffect(() => {
        //addPlayer({name: "Christian", cupsMade: 0});
        //addPlayer({name: "Jack", cupsMade: 0});
    }, []); // Empty dependency array means this runs only on mount

    return (
        <div>
            <h1>{headingText}</h1>
            <Button color="primary" variant="solid" onClick={ () => {PassTurn(); }}>Next Turn</Button>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                <div style={{backgroundColor: "#0070f3"}}>
                    <Pyramid rows={4} selectedPlayer={selectedPlayer} updateCupsMade={updateCupsMade} />
                </div>
            
                <div style={{backgroundColor: "#337000"}}>
                    <h1>Select player to throw</h1>
                    <div style={{display: "flex", justifyContent: "center", gap: "40px"}}>
                        {
                            teams != null &&
                            teams.find(team => team.id == currentTeam)!.players.map((player, index2) =>(
                                <Button key={index2} color="primary" variant="solid" onClick={ () => {selectPlayer(player.name); }}>{player.name}</Button>
                            ))
                            ||
                            <p>No teams defined</p>
                        }
                    </div>

                </div>
            </div>
            <div>
                <h1>Stats:</h1>
                <div>
                    {
                        teams != null &&
                        teams.find(team => team.id == currentTeam)!.players.map((item, index) => (
                            <p key={index}>{item.name}: {item.cupsMade}</p>
                        ))
                        ||
                        <p>No teams defined</p>
                    }
                </div>
            </div>
        </div>
    );
  };

  export default Game;