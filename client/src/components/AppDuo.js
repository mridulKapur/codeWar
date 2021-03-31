import React from "react";
import { Dropdown } from "semantic-ui-react";
import languages from "../utils/languages";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/mode-c_cpp";
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
    const selectedVal = languages.filter((v) => v.key == data.value);
    this.setState({
      currentLang: data.value,
      codeValue: selectedVal[0].template,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <Dropdown
            placeholder="Languages"
            onChange={this.onDDChange}
            selection
            value={this.state.currentLang}
            options={languages}
          />
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
            value={this.state.codeValue}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </div>
        <div className="col-6">
          <Dropdown
            placeholder="Languages"
            onChange={this.onDDChange}
            selection
            value={this.state.currentLang}
            options={languages}
          />
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
            value={this.state.codeValue}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
