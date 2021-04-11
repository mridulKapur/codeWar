import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import * as ace from "ace-builds";
import RunButton from "./button";
import "../styles/editor.scss";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";
import { Button, TextArea } from "semantic-ui-react";

const Editor = ({ spectator, editor, codeValue, socket }) => {
  const [code, setCode] = useState(codeValue);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  useEffect(() => {
    socket.on('ans', (data) => {
      setOutput(data.output)
    })
    console.log('idg', spectator)
    socket.on("receiveCode", (data) => { 
      console.log('in rc')
      if(spectator) {
        setCode(data.code)
      }
    });
  },[]);
  const setC = (e) => {
    setCode(e);
    socket.emit("sendCode", {
      code: e
    });
  };
  const setI = (e) => {
    setInput(e.target.value);
  };
  const runCode = () => {
    socket.emit('run', {
      code: code,
      language: 'cpp',
      input: input
    })
  }

  return (
    <div>
      <AceEditor
        style={{
          margin: "1rem 1rem 0.8rem 0rem",
          width: "inherit",
          height: "70vh",
        }}
        fontSize={18}
        mode="c_cpp"
        theme="github"
        onChange={(e) => setC(e)}
        readOnly={spectator || editor ? true : false}
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

export default Editor;
