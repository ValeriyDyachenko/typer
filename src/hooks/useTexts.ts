import { useState } from "react";
import texts from "../assets/pangrams";

export const useTexts = () => {
  const getRandIndex = () => Math.round(Math.random() * (texts.length - 1));
  const [text, setText] = useState<string>(texts[getRandIndex()]);
  const [nextTextType, setNextTextType] = useState<"random" | "practice">(
    "practice"
  );
  const resetText = (practice?: string) => {
    if (practice) {
      setNextTextType("random");
      setText(practice);
      return;
    }
    setNextTextType("practice");
    setText(texts[getRandIndex()]);
  };
  return { text, resetText, nextTextType };
};
