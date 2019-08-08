import React from "react";
import { Stat, sortedMetrica } from "../types/index";
import { SpeedStat, MissStat } from "../types";

export const sortStat = (
  statictic: Stat,
  metrica: sortedMetrica,
  slice?: number
) => {
  const CHAR = 0;
  const PARAMS = 1;
  return Object.entries(statictic)
    .filter(v => v[PARAMS][metrica] > 0)
    .sort((a, b) => b[PARAMS][metrica] - a[PARAMS][metrica])
    .slice(...[0, slice])
    .reduce((a, v) => {
      return { ...a, [v[CHAR]]: v[PARAMS][metrica] };
    }, {});
};

export const format = ({
  stat,
  measure = "",
  classNameChar = "",
  classNameInfo = ""
}: {
  stat: SpeedStat | MissStat;
  measure?: string;
  classNameChar?: string;
  classNameInfo?: string;
}) => {
  if (!stat) {
    return false;
  }
  const CHAR = 0;
  const COUNT = 1;
  const comma = (i: number) => (
    <span key={i} className={classNameInfo}>
      {i > 0 ? ", " : ""}
    </span>
  );
  const letter = (c: string) => {
    const char = c === " " ? "[space] " : c;
    return (
      <span key={char} className={classNameChar}>
        {char}{" "}
      </span>
    );
  };
  const meas = (
    <span key={measure} className={classNameInfo}>
      {" "}
      {measure}{" "}
    </span>
  );
  return Object.entries(stat)
    .filter(stat => stat[COUNT] > 0)
    .map((stat, i) => [
      comma(i),
      letter(stat[CHAR]),
      Math.round(stat[COUNT]),
      meas
    ]);
};

export const rndStringFromArray = (_a: string[], len: number = 24) => {
  const a = _a.map(c => c.toLowerCase());
  let result = "";
  const isUniques = new Set(a).size > 1;
  const alphabetRegex = /[a-zA-Zа-яА-ЯЁё]/g;
  const isAlphabetic = a.join("").match(alphabetRegex);
  for (let i = 0; i < len; i++) {
    if (i > 0 && isUniques && isAlphabetic) {
      let nextChar;
      do {
        nextChar = a[Math.round(Math.random() * (a.length - 1))];
      } while (
        nextChar === result[result.length - 1] ||
        ([".", ",", "!", "?"].includes(nextChar) &&
          [".", ",", " ", "?", "!"].includes(result[result.length - 1]))
      );
      result += [".", "?", "!", ","].includes(nextChar)
        ? `${nextChar} `
        : nextChar;
      if ([".", "?", "!"].includes(result[result.length - 3])) {
        result =
          result.slice(0, result.length - 1) +
          result[result.length - 1].toUpperCase();
      }
    } else {
      if (isAlphabetic) {
        let nextChar;
        do {
          nextChar = a[Math.round(Math.random() * (a.length - 1))];
        } while ([".", "?", "!"].includes(nextChar));
        result += nextChar;
      } else {
        result += a[Math.round(Math.random() * (a.length - 1))];
      }
    }
    if (i + 1 < len && Math.random() > 0.68) {
      result += " ";
    }
  }
  result = result.trim();
  return `${result.charAt(0).toUpperCase()}${result.slice(1)}${
    result[result.length - 1].match(alphabetRegex)
      ? [".", "?", "!"][Math.round(Math.random() * 2)]
      : ""
  }`;
};

export const repeat = (missStat: {}, reactStat: {}) => {
  let missChars = [];
  let reactChars = [];
  let practice: string[] = [];
  if (missStat) {
    missChars = Object.keys(missStat);
    practice = practice.concat(missChars);
  }
  if (reactStat) {
    reactChars = Object.keys(reactStat).slice(0, 3);
    practice = practice.concat(reactChars);
  }
  return rndStringFromArray(practice);
};
