import React from "react";
import AceEditor from "react-ace";
import * as ace from "ace-builds";
import RunButton from "./button";
import "../styles/editor.scss";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({ spectator, editor, codeValue }) => {
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
        readOnly={spectator || editor ? true : false}
        showPrintMargin={false}
        name="UNIQUE_ID_OF_DIV"
        value={codeValue}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
      <div className="inline">
        <span>
          <RunButton className="RunButton" />
          <textarea placeholder="Input"></textarea>
          <textarea
            type="text"
            disabled
            placeholder="Output"
            className="output"
          />
        </span>
      </div>
    </div>
  );
};

export default Editor;
