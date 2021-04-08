import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import AceEditor from "react-ace";
import * as ace from "ace-builds";
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

class Editor extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      output: ""
    }
    this.editor = React.createRef();
    this.runCode = this.runCode.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('ans', (data) => {
      this.setState({output: data.output})
    })
  }

  runCode = () => {
    this.props.socket.emit('run', {
      code: this.editor.current.editor.getValue(),
      language: this.props.currentLang,
      input: ''
    })
  };

  render() {
    return (
      <div>
        <AceEditor
          style={{
            margin: "1rem 1rem 0.8rem 0rem",
            width: "inherit",
            height: "70vh",
          }}
          ref={this.editor}
          fontSize={18}
          mode={mode[this.props.modeIndex]}
          theme="github"
          readOnly={this.props.spectator || this.props.editor ? true : false}
          showPrintMargin={false}
          name="UNIQUE_ID_OF_DIV"
          value={this.props.codeValue}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <div style={{display:"flex",flexDirection:"row-reverse",width:"100%",margin:"1rem 0"}}>
          <Button className="runButton" onClick={this.runCode}>run</Button>
          <div style={{display:"inline-flex",width:"80%",flexDirection:"row"}}>
            <TextArea placeholder="Input"/>
            <TextArea
              value={this.state.output}
              placeholder="Output"
            />
          </div>
        </div>  
      </div>
    );
  }
}

export default Editor;
