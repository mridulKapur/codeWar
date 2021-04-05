import React from "react";
import { Dropdown } from "semantic-ui-react";
import languages from "../utils/languages";
import "../styles/AppSolo.scss";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

import "ace-builds/src-noconflict/ext-language_tools";
import AceEditor from "react-ace";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLang: languages[0].key,
      codeValue: languages[0].template,
    };
    this.onDDChange = this.onDDChange.bind(this);
  }

  onDDChange = (e, data) => {
    const selectedVal = languages.filter((v) => v.key === data.value);
    this.setState({
      currentLang: data.value,
      codeValue: selectedVal[0].template,
    });
  };

  render() {
    return (
      <div className="soloEditor">
        <Dropdown
          style={{
            margin: "1rem 1rem 0rem 1rem",
            borderRadius: "1rem",
          }}
          placeholder="Languages"
          onChange={this.onDDChange}
          selection
          value={this.state.currentLang}
          options={languages}
        />
        <div className="field">
          <AceEditor
            style={{
              marginTop: "10px",
              width: "80vw",
              height: "90.4vh",
            }}
            fontSize={18}
            mode="c_cpp"
            theme="github"
            showPrintMargin={false}
            name="UNIQUE_ID_OF_DIV"
            value={this.state.codeValue}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
          <div className="flex">
            <textarea className="input" placeholder="input" />
            <textarea className="output" placeholder="output" disabled />
            <button className="ui button big teal"> Run </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
