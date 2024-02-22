"use client";
import calculatePoints from "@/functions/calculateDistance";
import React, { useEffect, useState } from "react";
import Confetti from "js-confetti";
import { useRouter } from "next/navigation";
import JSConfetti from "js-confetti";

const ColorPicker = ({
  answer,
  setRefresh,
}: {
  answer: {
    name: string;
    hex: string;
    rgb: string;
    families: string[];
  };
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [confetti, setConfetti] = useState<JSConfetti | null>(null);
  const [color, setColor] = useState("#000000");
  const [guesses, setGuesses] = useState(0);
  const [hint, setHint] = useState("");
  const [fail, setFail] = useState(false);
  const [guessedCorrect, setGuessedCorrect] = useState(false);

  useEffect(() => {
    setConfetti(new Confetti());
  }, []);

  const router = useRouter();

  const handleColorChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setColor(e.target.value);
  };

  const handleBgChange = () => {
    const game = document.getElementById("game") as HTMLElement;
    game.style.backgroundColor = answer.hex;
  };

  const triggerConfetti = () => {
    confetti &&
      confetti.addConfetti({
        emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
      });

    setTimeout(() => {
      confetti && confetti.clearCanvas();
    }, 3000);
  };

  const triggerPoop = () => {
    confetti &&
      confetti.addConfetti({
        emojis: ["💩", "💩", "💩"],
      });

    setTimeout(() => {
      confetti && confetti.clearCanvas();
    }, 3000);
  };

  const handleGuess = () => {
    const distance = calculatePoints(color, answer.hex);
    setGuesses(guesses + 1);

    if (guesses === 2) {
      setHint(answer.families.join(", "));
    }

    if (guesses === 4) {
      setFail(true);

      confetti &&
        confetti.addConfetti({
          emojis: ["💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩"],
          confettiNumber: 100,
        });

      setTimeout(() => {
        confetti && confetti.clearCanvas();
      }, 3000);

      handleBgChange();
    }

    if (distance < 75) {
      triggerConfetti();
      const game = document.getElementById("game") as HTMLElement;
      game.style.backgroundColor = answer.hex;
      setGuessedCorrect(true);
    } else {
      triggerPoop();
    }
  };

  const handleReset = () => {
    setGuesses(0);
    setGuessedCorrect(false);
    setFail(false);
    setHint("");
    setColor("#000000");
    const game = document.getElementById("game") as HTMLElement;
    game.style.backgroundColor = "unset";
    router.refresh();
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center relative">
      <label
        htmlFor="colorPicker"
        className="w-10 h-10 rounded-full cursor-pointer bg-gray-300 shadow-md"
        style={{ backgroundColor: color }}
      ></label>
      <input
        type="color"
        id="colorPicker"
        className="sr-only left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        value={color}
        onChange={handleColorChange}
      />
      <span className="mt-2 text-gray-600">Pick a color</span>
      {guessedCorrect && (
        <button
          className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleReset}
        >
          Give me a new color
        </button>
      )}
      {!guessedCorrect && (
        <button
          className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleGuess}
        >
          Guess {guesses === 0 ? "" : "again"}
        </button>
      )}

      {hint && (
        <p className="text-sm text-gray-500 pt-4 text-center">
          Hint: Think {hint}
        </p>
      )}
      {fail && (
        <>
          <p className="text-sm text-red-500 text-center">
            You colored outside the lines and ended up with a shtshow! 🤡
          </p>
          <button
            className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleReset}
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
