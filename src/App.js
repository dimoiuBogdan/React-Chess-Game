import "./App.scss";
import Board from "./COMPONENTS/Board/Board";
import { useState } from "react";
const App = () => {
  const [announcerTeam, setAnnouncerTeam] = useState("");
  return (
    <div id="chess-game">
      <h2
        className={`current-team ${
          announcerTeam === "our" ? "white" : "black"
        }`}
      >
        Turn: {announcerTeam === "our" ? "white" : "black"}
      </h2>
      <Board setAnnouncerTeam={setAnnouncerTeam} />
    </div>
  );
};

export default App;
