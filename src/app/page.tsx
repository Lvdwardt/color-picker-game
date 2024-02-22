"use client";
import ColorPicker from "@/components/ColorPicker";
import { colors } from "@/data/colors";
import { useEffect, useState } from "react";

export default function Game() {
  const [refresh, setRefresh] = useState(0);
  function getRandomItem(array: string | any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const [randomColor, setRandomColor] = useState({
    name: "loading...",
    hex: "#000000",
    rgb: "rgb(0, 0, 0)",
    families: ["black"],
  });

  useEffect(() => {
    const randomColor = getRandomItem(colors);
    setRandomColor(randomColor);
  }, [refresh]);

  return (
    <div
      id="game"
      className="h-screen w-screen flex items-center justify-center flex-col"
    >
      <div className="bg-white flex items-center flex-col p-12 max-w-[500px] rounded-[32px] shadow-xl">
        <p className="pb-4 font-bold text-3xl">Hue-la-la!</p>
        <p className="pb-4 font-bold text-lg">How Good Are Hue?</p>
        <p className="text-balance text-center mb-0 text-sm">
          The ultimate test of your color savvy! Can you match HTML color names
          with their color codes? Let&apos;s paint the town with your knowledge!
          🌈💡
        </p>
        <p className="mt-4 mb-4 text-lg">
          Guess the color: <b>{randomColor.name}</b>
        </p>
        <ColorPicker answer={randomColor} setRefresh={setRefresh} />
      </div>
      <p className="text-center mt-4 text-[8px] pb-2">
        By: Hueri Pasmans, Leon van de Hueardt, Anne van den Huegen, Frank van
        der Huemmen, Russell Huemo
      </p>
    </div>
  );
}
