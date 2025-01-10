"use client";
import Image from "next/image";
import Game from "./components/Game";
import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";

import { HomePage } from "./pages/HomePage"

export default function Home() {

    const [state, setState] = useState<string>("Home");

    return (
        <NextUIProvider>

            {state == "Home" &&
                <HomePage>

                </HomePage>
            }
            {
                state == "Game" &&
                <Game></Game>

            }
        </NextUIProvider>
    );
}