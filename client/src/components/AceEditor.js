import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "../styles/AppDuo.scss";
import languages from "../utils/languages";
import * as ace from "ace-builds";
import RunButton from "./button";
import "../styles/editor.scss";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";
import { Button, TextArea } from "semantic-ui-react";

let mode = ["c_cpp", "java", "python"];

const Editor = ({ spectator, editor1, editor2, socket, room }) => {
  const [code, setCode] = useState(languages[0].template);
  const [lang, setLang] = useState(languages[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  console.log(room);
  useEffect(() => {
    socket.on("ans", (data) => {
      if (data.editor1 == editor1 && data.editor2 == editor2) {
        setOutput(data.output);
      }
    });
    socket.on("receiveCode", (data) => {
      if (data.editor1 == editor1 && data.editor2 == editor2) {
        setCode(data.code);
      }
    });
    socket.on("langUpdated", (data) => {
      if (data.editor1 == editor1 && data.editor2 == editor2) {
        setLang(data.language);
      }
    });
  }, []);
  const sendLang = (lang) => {
    setLang(lang);
    socket.emit("langUpdate", {
      language: lang,
      editor1,
      editor2,
      roomName: room,
    });
  };
  useEffect(() => {
    setCode(lang.template);
  }, [lang]);
  const setC = (e) => {
    setCode(e);
    socket.emit("sendCode", {
      code: e,
      editor1: editor1,
      editor2: editor2,
      roomName: room,
    });
  };
  const setI = (e) => {
    setInput(e.target.value);
  };
  const runCode = () => {
    socket.emit("run", {
      code: code,
      language: lang.key,
      input: input,
      editor1,
      editor2,
      roomName: room,
    });
  };

  return (
    <div>
      <div
        className="langContainer"
        style={
          spectator ? { pointerEvents: "none", cursor: "not-allowed" } : {}
        }
      >
        <div className="langBtn">{lang.key}</div>
        <div
          className="langItem item1"
          onClick={() => {
            sendLang(languages[0]);
          }}
        >
          C++
        </div>
        <div
          className="langItem item2"
          onClick={() => {
            sendLang(languages[1]);
          }}
        >
          C
        </div>
        <div
          className="langItem item3"
          onClick={() => {
            sendLang(languages[2]);
          }}
        >
          Java
        </div>
        <div
          className="langItem item4"
          onClick={() => {
            sendLang(languages[3]);
          }}
        >
          Python 3
        </div>
      </div>
      <AceEditor
        style={{
          margin: "1rem 1rem 0.8rem 0rem",
          width: "inherit",
          height: "70vh",
        }}
        fontSize={18}
        mode={mode[lang.index]}
        theme="github"
        onChange={(e) => setC(e)}
        readOnly={spectator ? true : false}
        showPrintMargin={false}
        name="UNIQUE_ID_OF_DIV"
        value={code}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
      <div className="inline">
        <span>
          <TextArea
            placeholder="input"
            value={input}
            onChange={setI}
            disabled={spectator ? true : false}
          />
          <TextArea placeholder="output" disabled value={output} />
          <Button
            onClick={runCode}
            style={
              spectator ? { display: "none" } : { display: "block"}
            }
          >
            RUN
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Editor;
