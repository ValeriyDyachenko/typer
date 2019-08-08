import React from "react";
import { useState, useEffect } from "react";
import createUseContext from "constate";
import { Char } from "../types";
import { Stat } from "../types/index";
import { sortStat, format } from "../funcs";

const useAnalytics = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [pressedKeyCnt, setPressedKeyCnt] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [stat, setStat] = useState<Stat>();
  const [reactFormatted, setReactFormatted] = useState<React.ReactNode>([]);
  const [missFormated, setMissFormated] = useState<React.ReactNode>([]);
  const [averageSpeed, setAverageSpeed] = useState("");
  const [react, setReact] = useState({});
  const [miss, setMiss] = useState({});

  const resetAllStat = () => {
    setTotalTime(0);
    setPressedKeyCnt(0);
    setSpeed(0);
    setStat(undefined);
    setReactFormatted([]);
    setMissFormated([]);
    setAverageSpeed("");
    setReact({});
    setMiss({});
  };

  const onSuccess = (c: Char) => {
    if (c.index === 0) {
      // the first character is always the slowest; therefore, I excluded it from statistics
      return;
    }

    setPressedKeyCnt(cnt => cnt + 1);
    setTotalTime(ms => ms + Date.now() - c.date);

    setStat(stat => {
      if (stat && stat[c.char]) {
        let { reactSummary, cnt, miss } = stat[c.char];
        reactSummary += Date.now() - c.date;
        cnt += 1;
        const react = reactSummary / cnt;
        return { ...stat, [c.char]: { reactSummary, cnt, miss, react } };
      }
      const react = Date.now() - c.date;
      return {
        ...(stat || {}),
        [c.char]: { reactSummary: react, cnt: 1, miss: 0, react: react }
      };
    });
  };

  useEffect(() => {
    if (totalTime && pressedKeyCnt) {
      setSpeed((60000 * pressedKeyCnt) / totalTime);
    }
  }, [totalTime, pressedKeyCnt]);

  const onError = (c: Char) => {
    setStat(stat => {
      if (stat && stat[c.char]) {
        let { miss } = stat[c.char];
        miss += 1;
        return { ...stat, [c.char]: { ...stat[c.char], miss } };
      }
      return {
        ...(stat || {}),
        [c.char]: { reactSummary: 0, cnt: 0, miss: 1, react: 0 }
      };
    });
  };

  useEffect(() => {
    if (stat) {
      const reactStat = sortStat(stat, "react", 3);
      const missStat = sortStat(stat, "miss");
      const averageSpeed = `${Math.round(speed)} chars (~${Math.round(
        speed / 5
      )} words) per minute`;
      const reactFormatted = format({
        stat: reactStat,
        measure: "ms",
        classNameChar: "big-font"
      });
      const missFormated = format({
        stat: missStat,
        classNameChar: "big-font"
      });
      setReactFormatted(reactFormatted);
      setMissFormated(missFormated);
      setAverageSpeed(averageSpeed);
      setReact(reactStat);
      setMiss(missStat);
    }
  }, [stat, speed]);

  return {
    speed,
    stat,
    onSuccess,
    onError,
    setSpeed,
    averageSpeed,
    missFormated,
    reactFormatted,
    react,
    miss,
    resetAllStat
  };
};

export const useAnalyticsContext = createUseContext(useAnalytics);
