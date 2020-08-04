import { useState } from "react";

// this function handle transitioning between pages
export const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition (newMode, replace = false) {

    setMode(newMode);

    if (replace) history.pop();

    setHistory((prev) => [...prev, newMode]);
  }

  function back () {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop();
    }
  }
  
  return { mode, transition, back };

}
