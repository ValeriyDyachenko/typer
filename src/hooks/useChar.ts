import { useEffect, useState } from "react";
import { Char } from "../types";

const newChar = ({
  index,
  char,
  date = Date.now()
}: {
  index: number;
  char: string;
  date?: number;
}): Char => ({
  index,
  char,
  date
});

export const useChar = (text: string) => {
  const [char, setChar] = useState<Char>(newChar({ index: 0, char: text[0] }));

  useEffect(() => {
    setChar(newChar({ index: 0, char: text[0] }));
  }, [text]);

  const nextChar = () => {
    const index = char.index + 1;
    setChar(newChar({ char: text[index], index }));
  };

  return { char, nextChar };
};
