import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@nextui-org/modal";

type League = {
    name: string;
    players: string[];
};

export function HomePage() {
    const [leagues, setLeagues] = useState<League[]>([
        { name: "League 1", players: ["Player 1", "Player 2"] },
    ]);
    const [showModal, setShowModal] = useState(false);

    // Called when a new league is created in the modal
    const handleCreateLeague = (newLegaue: League) => {
        setLeagues((prev) => [...prev, newLegaue]);
    };

    return (
        <div>
            <div className="m-2">
                <h1 style={{ fontSize: "2em" }}>Pong Leagues</h1>
                <Button onPress={() => setShowModal(true)}>New League</Button>
            </div>

            <div>
                {leagues.map((league, index) => (
                    <LeagueCard key={index} league={league} />
                ))}
            </div>

            {/* The Modal for Creating a New League */}
            <CreateLeagueModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateLeague}
            />
        </div>
    );
}

type LeagueCardProps = {
    league: League;
};

function LeagueCard({ league }: LeagueCardProps) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}

            className="flex items-center gap-x-12"
        >
            <h2>{league.name}</h2>
            <h3>Players: {league.players.length}</h3>
        </div>
    );
}


type CreateLeagueModalProps = {
    open: boolean;                  // Controls whether the modal is open
    onClose: () => void;           // Triggered when the modal closes
    onCreate: (newLeague: League) => void; // Called when the user creates a league
};

export function CreateLeagueModal({ open, onClose, onCreate }: CreateLeagueModalProps) {
    const [leagueName, setLeagueName] = useState("");
    const [players, setPlayers] = useState<string[]>([]);
    const [newPlayerName, setNewPlayerName] = useState("");

    const handleCreate = () => {
        const trimmedName = leagueName.trim();
        if (trimmedName) {
            const newLeague: League = { name: trimmedName, players: players };
            onCreate(newLeague);
            setLeagueName("");
            handleClose();
        }
    };

    const handleClose = () => {
        setLeagueName("");
        setPlayers([]);
        setNewPlayerName("");
        onClose();
    }

    return (
        <Modal
            isOpen={open}
            onOpenChange={handleClose}
            backdrop="blur"        // Creates a blurred overlay behind the modal
            placement="center"     // Centers the modal on the screen
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader>
                    <h2>Create a New League</h2>
                </ModalHeader>

                <ModalBody>
                    <Input
                        label="League Name"
                        placeholder="Enter league name..."
                        value={leagueName}
                        onValueChange={setLeagueName}
                        variant="bordered"
                        autoFocus
                    />
                    <p className="font-bold">Players:</p>
                    {players.map((player, index) => (
                        <div key={index}>{player}</div>
                    ))}
                    <Input
                        placeholder="Enter player name..."
                        value={newPlayerName}
                        onValueChange={setNewPlayerName}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setPlayers((prev) => [...prev, newPlayerName]);
                                setNewPlayerName("");
                            }
                        }}
                        variant="bordered"
                    />
                    <Button onClick={() => {
                        setPlayers((prev) => [...prev, newPlayerName]);
                        setNewPlayerName("");
                    }}>Add Player</Button>
                </ModalBody>

                <ModalFooter>
                    <Button onPress={handleCreate}>Create</Button>
                    <Button variant="light" onPress={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}