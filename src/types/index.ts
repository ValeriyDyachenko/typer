export interface Char {
  index: number;
  char: string;
  date: number;
}

export interface CharAnalyt {
  react: number;
  reactSummary: number;
  cnt: number;
  miss: number;
}

export interface Stat {
  [key: string]: CharAnalyt;
}

export type sortedMetrica = "react" | "miss";

export interface SpeedStat {
  [key: string]: number;
}

export interface MissStat {
  [key: string]: number;
}
