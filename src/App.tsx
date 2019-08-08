import React, { Fragment, FunctionComponent, useState, useEffect } from "react";
import TextWriter from "./components/TextWriter";
import { useEventListener } from "./hooks/useEventListener";
import { useAnalyticsContext } from "./hooks/useAnalytics";
import "./App.css";

const App: FunctionComponent = () => {
  const [ready, setReady] = useState(false);

  const { unscribe: unscribeOnStartListener } = useEventListener(
    "keypress",
    () => setReady(true)
  );

  useEffect(() => {
    unscribeOnStartListener && unscribeOnStartListener();
  }, [ready, unscribeOnStartListener]);

  const Game = () => {
    const {
      averageSpeed,
      missFormated,
      reactFormatted
    } = useAnalyticsContext();
    return (
      <Fragment>
        <TextWriter />
        <div className="info">
          <div className="info_paragraph">speed: {averageSpeed}</div>
          <div className="info_paragraph">the slowest: {reactFormatted}</div>
          <div className="info_paragraph">with typos: {missFormated}</div>
        </div>
      </Fragment>
    );
  };

  return (
    <useAnalyticsContext.Provider>
      <div className="App">{ready ? <Game /> : "press any key to start"}</div>
    </useAnalyticsContext.Provider>
  );
};

export default App;
