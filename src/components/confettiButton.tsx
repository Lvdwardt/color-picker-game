"use client";
import Confetti from "js-confetti";
import { useEffect, useState } from "react";

export default function ConfettiButton({ label }: { label: string }) {
  const confetti = new Confetti();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  const triggerConfetti = () => {
    confetti.addConfetti({
      emojis: ["💩", "💩", "💩"],
    });

    setTimeout(() => {
      confetti.clearCanvas();
    }, 3000);
  };

  return (
    <button onClick={triggerConfetti} className="rounded-lg bg-green-500 p-4">
      {label}
    </button>
  );
}
