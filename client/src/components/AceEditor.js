import React from "react";
import AceEditor from "react-ace";
import * as ace from "ace-builds";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({ marginRight }) => {
  return (
    <AceEditor
      style={{
        marginRight,
        marginTop: "10vh",
        width: "80vw",
        height: "85vh",
      }}
      fontSize={18}
      mode="c_cpp"
      theme="monokai"
      showPrintMargin={false}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
};

export default Editor;
