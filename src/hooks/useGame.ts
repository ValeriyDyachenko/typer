import { useCallback } from "react";
import { useTexts } from "./useTexts";
import { useEventListener } from "./useEventListener";
import { useChar } from "./useChar";
import { useAnalyticsContext } from "./useAnalytics";
import { repeat } from "../funcs";

export const useGame = () => {
  const { text, resetText, nextTextType } = useTexts();
  const { char, nextChar } = useChar(text);
  const {
    onSuccess,
    onError,
    miss,
    react,
    resetAllStat
  } = useAnalyticsContext();

  const keyPressHandler = useCallback(
    (e: KeyboardEvent) => {
      const eventLetter = e.shiftKey ? e.key.toUpperCase() : e.key;
      if (char.char !== eventLetter) {
        // wrong, try again;
        onError(char);
        return;
      }
      onSuccess(char);
      if (char.index === text.length - 1) {
        // win, try new text
        if (nextTextType === "random") {
          resetAllStat();
          resetText();
          return;
        }
        resetText(repeat(miss, react));
        return;
      }
      // good,next char
      nextChar();
    },
    [
      char,
      nextChar,
      resetText,
      text,
      onSuccess,
      onError,
      nextTextType,
      miss,
      react,
      resetAllStat
    ]
  );

  useEventListener("keypress", keyPressHandler);

  return { text, index: char.index };
};
