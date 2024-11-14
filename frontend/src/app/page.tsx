import Image from "next/image";
import Game from "./components/Game";
import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
  return (
      <NextUIProvider>
        <Game></Game>
      </NextUIProvider>
  );
}
