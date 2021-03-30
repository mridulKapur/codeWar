import React from "react";
import Editor from "./components/AceEditor";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <div className="editors">
        <Editor marginRight="1rem" />
        <Editor />
      </div>
    </div>
  );
}

export default App;
