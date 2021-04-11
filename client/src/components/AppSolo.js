import React, { useState, useEffect } from "react";
import { TextArea, Button } from "semantic-ui-react";

import languages from "../utils/languages";
import "../styles/AppDuo.scss";
//editor
import AceEditor from "react-ace";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";


const AppSolo = ({ socket }) => {
  const [lang, setLang] = useState(languages[0]);
  const [code, setCode] = useState(lang.template);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const setI = (e) => {
    setInput(e.target.value);
  };
  const runCode = () => {
    socket.emit("run", {
      code: code,
      language: lang.key,
      input: input
    });
  };

  useEffect(() => {
    socket.on("ans", (data) => {
      setOutput(data.code)
    });
  }, []);

  useEffect(() => {
    setCode(lang.template)
  }, [lang])

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
      </div>
      <AceEditor
          style={{
            margin: "3rem auto",
            width: "80vw",
            height: "70vh",
          }}
          fontSize={18}
          mode="c_cpp"
          theme="github"
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
          <TextArea placeholder="input" value={input} onChange={setI} />
          <TextArea placeholder="output" disabled value={output} />
          <Button onClick={runCode}>RUN</Button>
        </span>
      </div>
    </div>
  );
};
export default AppSolo;
