import React from "react";
import { useGame } from "../hooks/useGame";

const TextWriter: React.SFC = () => {
  const { text, index } = useGame();
  let typed = text.slice(0, index);
  let rest = text.slice(index);

  return (
    <div>
      {typed}
      <span className="current-char-arrow">^</span>
      {rest}
    </div>
  );
};

export default TextWriter;
