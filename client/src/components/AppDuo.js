import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

import languages from "../utils/languages";
import Editor from "./AceEditor";
import "../styles/AppDuo.scss";
//editor
import AceEditor from "react-ace";
import * as ace from "ace-builds";
import RunButton from "./button";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";

const AppDuo = ({ socket }) => {
  const [lang, setLang] = useState(languages[0]);
  const [editor1, setEditor1] = useState(false);
  const [editor2, setEditor2] = useState(false);
  const [spectator, setSpectator] = useState(false);

  useEffect(() => {
    socket.on("allow", (data) => {
      console.log("in allow");
      if (data.data.members[0] === socket.id) {
        console.log(1);
        setEditor1(true);
        console.log(editor1);
      } else if (data.data.members[1] === socket.id) {
        console.log(2);
        setEditor2(true);
        console.log(editor2);
      } else {
        console.log("spec true");
        setSpectator(true);
        console.log(spectator);
      }
    });
  });

  return (
    <div className="row">
      <div>
        <div className="langContainer">
          <div className="langBtn">{lang.key}</div>
          <div className="langItem item1" onClick={() => setLang(languages[0])}>
            C++
          </div>
          <div className="langItem item2" onClick={() => setLang(languages[1])}>
            C
          </div>
          <div className="langItem item3" onClick={() => setLang(languages[2])}>
            Java
          </div>
          <div className="langItem item4" onClick={() => setLang(languages[3])}>
            Python 3
          </div>
        </div>
        {editor1 ? (
          <div>
            <Editor
              spectator={spectator}
              editor1={true}
              editor2={false}
              codeValue={lang.template}
              modeIndex={lang.index}
              currentLang={lang.key}
              socket={socket}
            />
          </div>
        ) : editor2 ? (
          <div>
            <Editor
              spectator={spectator}
              editor1={false}
              editor2={true}
              codeValue={lang.template}
              modeIndex={lang.index}
              currentLang={lang.key}
              socket={socket}
            />
          </div>
        ) : (
          <div>
            <div>
              <Editor
                spectator={spectator}
                editor1={true}
                editor2={false}
                codeValue={lang.template}
                modeIndex={lang.index}
                currentLang={lang.key}
                socket={socket}
              />
            </div>
            <div>
              <Editor
                spectator={spectator}
                editor1={false}
                editor2={true}
                codeValue={lang.template}
                modeIndex={lang.index}
                currentLang={lang.key}
                socket={socket}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AppDuo;
