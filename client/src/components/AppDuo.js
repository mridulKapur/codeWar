import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { Button } from 'semantic-ui-react';
import languages from "../utils/languages";
import "../styles/AppDuo.scss";
//editor
import Editor from "./AceEditor";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

const AppDuo = ({ socket }) => {
  const { width } = getWindowDimensions();
  const [lang, setLang] = useState(languages[0]);
  const [viewOpponent, setViewOpponent] = useState(false);
  const [editor1, setEditor1] = useState(false);
  const [editor2, setEditor2] = useState(false);
  const [spectator, setSpectator] = useState(false);

  useEffect(() => {
    socket.on("allow", (data) => {

      if (data.data.members[0] === socket.id) {
        setEditor1(true);
      } else if (data.data.members[1] === socket.id) {
        console.log(2);
        setEditor2(true);
      } else {
        setSpectator(true);
      }
    });
  });

  return (
    <div className="row">
      <div className="modal" style={viewOpponent ? { display: "block" } : { display: "none" }}  onClick={()=>setViewOpponent(false)}/>
      <div className="opponentInfoContainer" style={viewOpponent?{transform: "translateX(0px)"}:{transform: "translateX(400px)"}}>
        <Button onClick={()=>setViewOpponent(!viewOpponent)} style={{height:"40px"}}>view info</Button>
        <div className="opponentInfo"></div>
      </div>
      <div className="langContainer">
        <div className="langBtn">{lang.key}</div>
          <div className="langItem item1" onClick={()=>setLang(languages[0])}>C++</div>
          <div className="langItem item2" onClick={()=>setLang(languages[1])}>C</div>
          <div className="langItem item3" onClick={()=>setLang(languages[2])}>Java</div>
          <div className="langItem item4" onClick={()=>setLang(languages[3])}>Python 3</div>
      </div>
      <div style={{display:`${editor2?'none':'block'}`}}>
      <Editor spectator={spectator} editor={editor2} codeValue={lang.template} modeIndex={lang.index} currentLang={lang.key} socket={socket}/>
      </div>
      <div style={{display:`${editor1?'none':'block'}`}}>
        <Editor spectator={spectator} editor={editor1} codeValue={lang.template} modeIndex={lang.index} currentLang={lang.key} socket={socket} style={{ display: `${editor2 ? 'none' : 'block'}` }} />
      </div>
		</div>
	);
};
export default AppDuo;
