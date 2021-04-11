import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

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
  const [editor1, setEditor1] = useState(false);
  const [editor2, setEditor2] = useState(false);
  const [spectator, setSpectator] = useState(false);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("allow", (data) => {
      console.log(data);
      if (data.data.members[0] === socket.id) {
        console.log(1);
        setRoomName(data.data.name)
        setEditor1(true);
        console.log(editor1);
      } else if (data.data.members[1] === socket.id) {
        console.log(2);
        setRoomName(data.data.name)
        setEditor2(true);
        console.log(editor2);
      } else {
        console.log("spec true");
        setRoomName(data.data.name)
        setSpectator(true);
        console.log(spectator);
      }
    });
  });

  console.log(roomName)

  return (
    <div className="row">
      <div>
        
        {editor1 ? (
          <div>
            <Editor
              spectator={spectator}
              editor1={true}
              editor2={false}
              socket={socket}
              room={roomName}
            />
          </div>
        ) : editor2 ? (
          <div>
            <Editor
              spectator={spectator}
              editor1={false}
              editor2={true}
              socket={socket}
              room={roomName}
            />
          </div>
        ) : (
          <div>
            <div>
              <Editor
                spectator={spectator}
                editor1={true}
                editor2={false}
                room={roomName}
                socket={socket}
              />
            </div>
            <div>
              <Editor
                spectator={spectator}
                editor1={false}
                editor2={true}
                room={roomName}
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
